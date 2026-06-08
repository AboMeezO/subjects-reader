import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import type { NoteSummary } from '../features/subjects/types'

export const Route = createFileRoute('/subjects/$subjectId/notes')({
  component: NotesLayoutRoute,
})

function NotesLayoutRoute() {
  return <Outlet />
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

export function NotesLayout({ children }: { children: React.ReactNode }) {
  return <section className="study-shell">{children}</section>
}
