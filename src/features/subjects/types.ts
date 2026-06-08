export type SubjectSummary = {
  id: string
  title: string
  shortTitle: string
  grade: string
  language: string
  description: string
  order: number
  noteCount: number
  examCount: number
}

export type NoteSummary = {
  id: string
  subjectId: string
  title: string
  filename: string
  size: number
  updatedAt: string
}

export type NotePayload = {
  subject: SubjectSummary
  notes: Array<NoteSummary>
  selected: NoteSummary
  content: string
}
