export type PublicChoiceQuestion = {
  id: string
  type: 'choice'
  section: string
  prompt: string
  choices: Array<string>
}

export type PublicWrittenQuestion = {
  id: string
  type: 'written'
  section: string
  prompt: string
  points: number
}

export type PublicReadingSection = {
  title: string
  text: string
}

export type PublicExamQuestion = PublicChoiceQuestion | PublicWrittenQuestion

export type ExamSummary = {
  id: string
  subjectId: string
  title: string
  description: string
  durationSeconds: number
  choiceCount: number
  writtenCount: number
}

export type PublicExam = ExamSummary & {
  readings: Array<PublicReadingSection>
  questions: Array<PublicExamQuestion>
}

export type ExamResult = {
  examId: string
  choiceScore: number
  choiceTotal: number
  writtenTotal: number
  submittedAt: string
  choices: Array<{
    questionId: string
    selectedIndex: number | null
    correctIndex: number
    correct: boolean
  }>
  written: Array<{
    questionId: string
    answer: string
    points: number
    modelAnswer: string
  }>
}
