import { Link, createFileRoute } from '@tanstack/react-router'
import { Route as SubjectRoute } from './subjects.$subjectId'

export const Route = createFileRoute('/subjects/$subjectId/')({
  component: SubjectOverview,
})

function SubjectOverview() {
  const subject = SubjectRoute.useLoaderData()

  return (
    <>
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
    </>
  )
}
