import { Link, createFileRoute } from '@tanstack/react-router'
import { getSubjectNotes } from '../server/subjects'
import { NotesLayout } from './subjects.$subjectId.notes'

export const Route = createFileRoute('/subjects/$subjectId/notes/')({
  loader: ({ params }) => getSubjectNotes({ data: { subjectId: params.subjectId } }),
  component: NotesIndex,
})

function NotesIndex() {
  const { subject, notes } = Route.useLoaderData()

  return (
    <NotesLayout>
      <section className="section-heading">
        <p>{subject.shortTitle}</p>
        <h1>Notes</h1>
        <span>Select a file from the subject library.</span>
      </section>
      <div className="resource-grid">
        {notes.map((note) => (
          <Link
            key={note.id}
            className="resource-card"
            to="/subjects/$subjectId/notes/$noteId"
            params={{ subjectId: subject.id, noteId: note.id }}
          >
            <span>{note.filename}</span>
            <h2>{note.title}</h2>
            <p>{Math.max(1, Math.round(note.size / 1024))} KB</p>
          </Link>
        ))}
      </div>
    </NotesLayout>
  )
}
