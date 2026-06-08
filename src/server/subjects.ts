import { readdir, readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { createServerFn } from '@tanstack/react-start'
import type { NotePayload, NoteSummary, SubjectSummary } from '../features/subjects/types'

type SubjectMetadata = Omit<SubjectSummary, 'noteCount' | 'examCount'>

const contentRoot = join(process.cwd(), 'content', 'subjects')

function assertId(value: unknown, label: string) {
  if (typeof value !== 'string' || !/^[a-z0-9][a-z0-9-]*$/i.test(value)) {
    throw new Error(`Invalid ${label}`)
  }

  return value
}

function titleFromFilename(filename: string) {
  return filename
    .replace(/\.md$/i, '')
    .replace(/^\d+-/, '')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function noteIdFromFilename(filename: string) {
  return filename.replace(/\.md$/i, '')
}

async function readSubjectMetadata(subjectId: string): Promise<SubjectMetadata> {
  const subjectPath = join(contentRoot, subjectId, 'subject.json')
  const raw = await readFile(subjectPath, 'utf8')
  const parsed = JSON.parse(raw) as Partial<SubjectMetadata>

  return {
    id: assertId(parsed.id, 'subject id'),
    title: String(parsed.title ?? subjectId),
    shortTitle: String(parsed.shortTitle ?? parsed.title ?? subjectId),
    grade: String(parsed.grade ?? ''),
    language: String(parsed.language ?? 'en'),
    description: String(parsed.description ?? ''),
    order: Number(parsed.order ?? 100),
  }
}

async function readNotes(subjectId: string): Promise<Array<NoteSummary>> {
  const notesPath = join(contentRoot, subjectId, 'notes')
  const entries = await readdir(notesPath, { withFileTypes: true }).catch(() => [])
  const markdownEntries = entries.filter((entry) => entry.isFile() && entry.name.endsWith('.md'))

  const notes = await Promise.all(
    markdownEntries.map(async (entry) => {
      const fileStats = await stat(join(notesPath, entry.name))

      return {
        id: noteIdFromFilename(entry.name),
        subjectId,
        title: titleFromFilename(entry.name),
        filename: entry.name,
        size: fileStats.size,
        updatedAt: fileStats.mtime.toISOString(),
      }
    }),
  )

  return notes.sort((a, b) => a.filename.localeCompare(b.filename, undefined, { numeric: true }))
}

export async function getSubjectSummaries(): Promise<Array<SubjectSummary>> {
  const entries = await readdir(contentRoot, { withFileTypes: true }).catch(() => [])

  const subjects = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const subject = await readSubjectMetadata(entry.name)
        const notes = await readNotes(subject.id)

        return {
          ...subject,
          noteCount: notes.length,
          examCount: subject.id === 'english-action-pack-12' ? 1 : 0,
        }
      }),
  )

  return subjects.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
}

export async function getSubjectSummary(subjectId: string) {
  const subjects = await getSubjectSummaries()
  const subject = subjects.find((item) => item.id === subjectId)
  if (!subject) throw new Error('Subject not found')
  return subject
}

export async function getNotePayload(subjectId: string, noteId?: string): Promise<NotePayload> {
  const safeSubjectId = assertId(subjectId, 'subject id')
  const safeNoteId = noteId ? assertId(noteId, 'note id') : undefined
  const subject = await getSubjectSummary(safeSubjectId)
  const notes = await readNotes(safeSubjectId)
  const selected = notes.find((note) => note.id === safeNoteId) ?? notes[0]

  if (!selected) throw new Error('No notes found for subject')

  const content = await readFile(join(contentRoot, safeSubjectId, 'notes', selected.filename), 'utf8')

  return { subject, notes, selected, content }
}

export const listSubjects = createServerFn({ method: 'GET' }).handler(() => getSubjectSummaries())

export const getSubject = createServerFn({ method: 'GET' })
  .inputValidator((data: { subjectId: string }) => data)
  .handler(({ data }) => getSubjectSummary(data.subjectId))

export const getSubjectNotes = createServerFn({ method: 'GET' })
  .inputValidator((data: { subjectId: string; noteId?: string }) => data)
  .handler(({ data }) => getNotePayload(data.subjectId, data.noteId))
