import { Link, createFileRoute } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import type { ExamResult } from '../features/exams/types'
import { submitExamAttempt } from '../server/exams'
import { Route as ExamRoute } from './subjects.$subjectId.exams.$examId'

export const Route = createFileRoute('/subjects/$subjectId/exams/$examId/attempt')({
  component: ExamAttempt,
})

function formatTime(seconds: number) {
  const safeSeconds = Math.max(0, seconds)
  const minutes = Math.floor(safeSeconds / 60)
  const remainingSeconds = safeSeconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

function ExamAttempt() {
  const exam = ExamRoute.useLoaderData()
  const [choiceAnswers, setChoiceAnswers] = useState<Record<string, number>>({})
  const [writtenAnswers, setWrittenAnswers] = useState<Record<string, string>>({})
  const [remainingSeconds, setRemainingSeconds] = useState(exam.durationSeconds)
  const [result, setResult] = useState<ExamResult | null>(null)
  const choiceQuestions = exam.questions.filter((question) => question.type === 'choice')
  const writtenQuestions = exam.questions.filter((question) => question.type === 'written')
  const answeredCount = useMemo(
    () =>
      choiceQuestions.filter((question) => Number.isInteger(choiceAnswers[question.id])).length +
      writtenQuestions.filter((question) => (writtenAnswers[question.id] ?? '').trim().length > 0).length,
    [choiceAnswers, choiceQuestions, writtenAnswers, writtenQuestions],
  )
  const totalQuestions = choiceQuestions.length + writtenQuestions.length
  const submitMutation = useMutation({
    mutationFn: () =>
      submitExamAttempt({
        data: {
          subjectId: exam.subjectId,
          examId: exam.id,
          choiceAnswers,
          writtenAnswers,
        },
      }),
    onSuccess: setResult,
  })

  useEffect(() => {
    if (result) return

    const intervalId = window.setInterval(() => {
      setRemainingSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(intervalId)
          return 0
        }

        return current - 1
      })
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [result])

  useEffect(() => {
    if (remainingSeconds === 0 && !result && !submitMutation.isPending) {
      submitMutation.mutate()
    }
  }, [remainingSeconds, result, submitMutation])

  const submitted = Boolean(result)

  return (
    <section className="wide">
      <section className="attempt-header">
        <div>
          <p>Active attempt</p>
          <h1>{exam.title}</h1>
          <span>
            {answeredCount}/{totalQuestions} answered
          </span>
        </div>
        <div className="attempt-clock" data-alert={remainingSeconds <= 300 && !submitted ? 'true' : undefined}>
          <span>Time left</span>
          <strong>{submitted ? 'Submitted' : formatTime(remainingSeconds)}</strong>
        </div>
      </section>

      {result ? (
        <section className="result-panel">
          <p>Result</p>
          <h2>
            {result.choiceScore}/{result.choiceTotal} MCQ correct
          </h2>
          <span>
            Written section total: {result.writtenTotal} points. Review model answers below for self-marking.
          </span>
        </section>
      ) : null}

      <form
        className="question-list"
        onSubmit={(event) => {
          event.preventDefault()
          if (!submitted) submitMutation.mutate()
        }}
      >
        {choiceQuestions.map((question, questionIndex) => {
          const resultChoice = result?.choices.find((choice) => choice.questionId === question.id)

          return (
            <fieldset key={question.id} className="question-block" disabled={submitted}>
              <legend>
                <span>{question.section}</span>
                {questionIndex + 1}. {question.prompt}
              </legend>
              {question.choices.map((choice, choiceIndex) => {
                const selected = choiceAnswers[question.id] === choiceIndex
                const correct = resultChoice?.correctIndex === choiceIndex
                const incorrectSelection = resultChoice && selected && !resultChoice.correct

                return (
                  <label
                    key={choice}
                    data-state={
                      correct && submitted
                        ? 'correct'
                        : incorrectSelection
                          ? 'incorrect'
                          : selected
                            ? 'selected'
                            : undefined
                    }
                  >
                    <input
                      type="radio"
                      name={question.id}
                      checked={selected}
                      onChange={() =>
                        setChoiceAnswers((currentAnswers) => ({
                          ...currentAnswers,
                          [question.id]: choiceIndex,
                        }))
                      }
                    />
                    <span>{choice}</span>
                  </label>
                )
              })}
            </fieldset>
          )
        })}

        {exam.readings.map((reading) => (
          <section key={reading.title} className="reading-block">
            <h2>{reading.title}</h2>
            {reading.text.split('\n\n').map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}

        {writtenQuestions.map((question, questionIndex) => {
          const writtenResult = result?.written.find((item) => item.questionId === question.id)

          return (
            <fieldset key={question.id} className="question-block written-question" disabled={submitted}>
              <legend>
                <span>{question.section}</span>
                {choiceQuestions.length + questionIndex + 1}. {question.prompt}
              </legend>
              <textarea
                value={writtenAnswers[question.id] ?? ''}
                onChange={(event) =>
                  setWrittenAnswers((currentAnswers) => ({
                    ...currentAnswers,
                    [question.id]: event.target.value,
                  }))
                }
                rows={5}
              />
              <p>{question.points} points</p>
              {writtenResult ? (
                <div className="model-answer">
                  <strong>Model answer</strong>
                  <span>{writtenResult.modelAnswer}</span>
                </div>
              ) : null}
            </fieldset>
          )
        })}

        <div className="attempt-actions">
          <button type="submit" disabled={submitted || submitMutation.isPending}>
            {submitMutation.isPending ? 'Submitting...' : submitted ? 'Submitted' : 'Submit attempt'}
          </button>
          <Link to="/subjects/$subjectId/exams/$examId" params={{ subjectId: exam.subjectId, examId: exam.id }}>
            Back to exam setup
          </Link>
        </div>
      </form>
    </section>
  )
}
