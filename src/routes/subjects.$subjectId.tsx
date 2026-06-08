import { Link, createFileRoute } from '@tanstack/react-router'
import { AppNav } from '../components/AppNav'
import { getSubject } from '../server/subjects'

export const Route = createFileRoute('/subjects/$subjectId')({
  loader: ({ params }) => getSubject({ data: { subjectId: params.subjectId } }),
  component: SubjectOverview,
})

function SubjectOverview() {
  const subject = Route.useLoaderData()

  return (
    <main className="app-shell">
      <AppNav subjectId={subject.id} />
      <section className="subject-hero">
        <p>{subject.shortTitle}</p>
        <h1>{subject.title}</h1>
        <span>{subject.description}</span>
      </section>
      <section className="action-grid" aria-label="Subject sections">
        <Link to="/subjects/$subjectId/notes" params={{ subjectId: subject.id }} className="action-panel">
          <span>Read</span>
          <h2>Notes</h2>
          <p>{subject.noteCount} Markdown files organized under this subject.</p>
        </Link>
        <Link to="/subjects/$subjectId/exams" params={{ subjectId: subject.id }} className="action-panel">
          <span>Practice</span>
          <h2>Exams</h2>
          <p>{subject.examCount} exam set with timed attempts and server-side scoring.</p>
        </Link>
      </section>
    </main>
  )
}
