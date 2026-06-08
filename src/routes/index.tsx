import { Link, createFileRoute } from '@tanstack/react-router'
import { AppNav } from '../components/AppNav'
import { listSubjects } from '../server/subjects'

export const Route = createFileRoute('/')({
  loader: () => listSubjects(),
  component: SubjectsDashboard,
})

function SubjectsDashboard() {
  const subjects = Route.useLoaderData()

  return (
    <main className="app-shell">
      <AppNav />
      <section className="dashboard-hero">
        <p>Study command center</p>
        <h1>Subjects</h1>
        <span>Choose a subject, then move between notes, practice exams, and results.</span>
      </section>
      <section className="subject-grid" aria-label="Available subjects">
        {subjects.map((subject) => (
          <Link
            key={subject.id}
            className="subject-card"
            to="/subjects/$subjectId"
            params={{ subjectId: subject.id }}
          >
            <div>
              <span>{subject.grade ? `Grade ${subject.grade}` : 'Subject'}</span>
              <h2>{subject.title}</h2>
              <p>{subject.description}</p>
            </div>
            <dl>
              <div>
                <dt>Notes</dt>
                <dd>{subject.noteCount}</dd>
              </div>
              <div>
                <dt>Exams</dt>
                <dd>{subject.examCount}</dd>
              </div>
            </dl>
          </Link>
        ))}
      </section>
    </main>
  )
}
