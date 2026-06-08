import { createServerFn } from '@tanstack/react-start'
import type { ExamResult, ExamSummary, PublicExam, PublicExamQuestion } from '../features/exams/types'
import type { ChoiceQuestion, Exam, WrittenQuestion } from './examBank.server'

const subjectExamMap: Record<string, Array<string>> = {
  'english-action-pack-12': ['english-2007-regular'],
}

function parseDurationSeconds(duration: string) {
  const hourMatch = duration.match(/(\d+(?:\.\d+)?)\s*hours?/i)
  if (hourMatch) return Math.round(Number(hourMatch[1]) * 60 * 60)

  const minuteMatch = duration.match(/(\d+(?:\.\d+)?)\s*minutes?/i)
  if (minuteMatch) return Math.round(Number(minuteMatch[1]) * 60)

  return 2 * 60 * 60
}

function assertId(value: unknown, label: string) {
  if (typeof value !== 'string' || !/^[a-z0-9][a-z0-9-]*$/i.test(value)) {
    throw new Error(`Invalid ${label}`)
  }

  return value
}

async function getExamBank() {
  return await import('./examBank.server')
}

function examBelongsToSubject(subjectId: string, examId: string) {
  return subjectExamMap[subjectId]?.includes(examId) ?? false
}

function toExamSummary(subjectId: string, exam: Exam): ExamSummary {
  const choiceCount = exam.questions.filter((question) => question.type === 'choice').length
  const writtenCount = exam.questions.filter((question) => question.type === 'written').length

  return {
    id: exam.id,
    subjectId,
    title: exam.title,
    description: exam.description,
    durationSeconds: parseDurationSeconds(exam.duration),
    choiceCount,
    writtenCount,
  }
}

function toPublicQuestion(question: ChoiceQuestion | WrittenQuestion): PublicExamQuestion {
  if (question.type === 'choice') {
    const { answerIndex: _answerIndex, ...publicQuestion } = question
    return publicQuestion
  }

  const { modelAnswer: _modelAnswer, ...publicQuestion } = question
  return publicQuestion
}

function toPublicExam(subjectId: string, exam: Exam): PublicExam {
  return {
    ...toExamSummary(subjectId, exam),
    readings: exam.readings,
    questions: exam.questions.map(toPublicQuestion),
  }
}

export async function getExamSummaries(subjectId: string) {
  const safeSubjectId = assertId(subjectId, 'subject id')
  const examIds = subjectExamMap[safeSubjectId] ?? []
  const { exams } = await getExamBank()

  return examIds
    .map((examId) => exams.find((exam) => exam.id === examId))
    .filter((exam): exam is Exam => Boolean(exam))
    .map((exam) => toExamSummary(safeSubjectId, exam))
}

export async function getPublicExam(subjectId: string, examId: string) {
  const safeSubjectId = assertId(subjectId, 'subject id')
  const safeExamId = assertId(examId, 'exam id')
  if (!examBelongsToSubject(safeSubjectId, safeExamId)) throw new Error('Exam not found')

  const { getExam } = await getExamBank()
  return toPublicExam(safeSubjectId, getExam(safeExamId))
}

export const listSubjectExams = createServerFn({ method: 'GET' })
  .validator((data: { subjectId: string }) => data)
  .handler(({ data }) => getExamSummaries(data.subjectId))

export const getSubjectExam = createServerFn({ method: 'GET' })
  .validator((data: { subjectId: string; examId: string }) => data)
  .handler(({ data }) => getPublicExam(data.subjectId, data.examId))

export const submitExamAttempt = createServerFn({ method: 'POST' })
  .validator(
    (data: {
      subjectId: string
      examId: string
      choiceAnswers: Record<string, number>
      writtenAnswers: Record<string, string>
    }) => data,
  )
  .handler(async ({ data }): Promise<ExamResult> => {
    const subjectId = assertId(data.subjectId, 'subject id')
    const examId = assertId(data.examId, 'exam id')
    if (!examBelongsToSubject(subjectId, examId)) throw new Error('Exam not found')

    const { getExam } = await getExamBank()
    const exam = getExam(examId)
    const choiceQuestions = exam.questions.filter((question): question is ChoiceQuestion => question.type === 'choice')
    const writtenQuestions = exam.questions.filter((question): question is WrittenQuestion => question.type === 'written')
    const choices = choiceQuestions.map((question) => {
      const selectedIndex = Number.isInteger(data.choiceAnswers[question.id])
        ? data.choiceAnswers[question.id]
        : null

      return {
        questionId: question.id,
        selectedIndex,
        correctIndex: question.answerIndex,
        correct: selectedIndex === question.answerIndex,
      }
    })

    return {
      examId,
      choiceScore: choices.filter((choice) => choice.correct).length,
      choiceTotal: choiceQuestions.length,
      writtenTotal: writtenQuestions.reduce((total, question) => total + question.points, 0),
      submittedAt: new Date().toISOString(),
      choices,
      written: writtenQuestions.map((question) => ({
        questionId: question.id,
        answer: data.writtenAnswers[question.id] ?? '',
        points: question.points,
        modelAnswer: question.modelAnswer,
      })),
    }
  })
