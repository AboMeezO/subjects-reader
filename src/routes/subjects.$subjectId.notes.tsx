import { Link, createFileRoute } from '@tanstack/react-router'
import type { NoteSummary } from '../features/subjects/types'
import { getSubjectNotes } from '../server/subjects'

export const Route = createFileRoute('/subjects/$subjectId/notes')({
  loader: ({ params }) => getSubjectNotes({ data: { subjectId: params.subjectId } }),
  component: NotesIndex,
})

function NotesIndex() {
  const { subject, notes } = Route.useLoaderData()

  return (
    <NotesLayout>
      <section className="subject-hero compact">
        <p>{subject.shortTitle}</p>
        <h1>Notes</h1>
        <span>Select a file from the subject library.</span>
      </section>
      <div className="subject-grid">
        {notes.map((note) => (
          <Link
            key={note.id}
            className="subject-card"
            to="/subjects/$subjectId/notes/$noteId"
            params={{ subjectId: subject.id, noteId: note.id }}
          >
            <div>
              <span>{note.filename}</span>
              <h2>{note.title}</h2>
              <p>{Math.max(1, Math.round(note.size / 1024))} KB</p>
            </div>
          </Link>
        ))}
      </div>
    </NotesLayout>
  )
}

export function NotesSidebar({
  subjectId,
  notes,
  selectedId,
}: {
  subjectId: string
  notes: Array<NoteSummary>
  selectedId: string
}) {
  return (
    <aside className="study-sidebar" aria-label="Notes">
      <div className="sidebar-heading">
        <span>Notes</span>
        <strong>{notes.length} files</strong>
      </div>
      <nav className="resource-list">
        {notes.map((note) => (
          <Link
            key={note.id}
            to="/subjects/$subjectId/notes/$noteId"
            params={{ subjectId, noteId: note.id }}
            className="resource-link"
            aria-current={selectedId === note.id ? 'page' : undefined}
          >
            <strong>{note.title}</strong>
            <span>{Math.max(1, Math.round(note.size / 1024))} KB</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export function NotesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section className="study-shell">{children}</section>
}
