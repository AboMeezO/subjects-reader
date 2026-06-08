import { createServerFn } from '@tanstack/react-start'

async function getSubjectServer() {
  return await import('./subjects.server')
}

export const listSubjects = createServerFn({ method: 'GET' }).handler(async () => {
  const { getSubjectSummaries } = await getSubjectServer()
  return getSubjectSummaries()
})

export const getSubject = createServerFn({ method: 'GET' })
  .validator((data: { subjectId: string }) => data)
  .handler(async ({ data }) => {
    const { getSubjectSummary } = await getSubjectServer()
    return getSubjectSummary(data.subjectId)
  })

export const getSubjectNotes = createServerFn({ method: 'GET' })
  .validator((data: { subjectId: string; noteId?: string }) => data)
  .handler(async ({ data }) => {
    const { getNotePayload } = await getSubjectServer()
    return getNotePayload(data.subjectId, data.noteId)
  })
