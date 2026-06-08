import { Link, createFileRoute } from '@tanstack/react-router'
import { AppNav } from '../components/AppNav'
import { listSubjectExams } from '../server/exams'
import { getSubject } from '../server/subjects'

export const Route = createFileRoute('/subjects/$subjectId/exams')({
  loader: async ({ params }) => ({
    subject: await getSubject({ data: { subjectId: params.subjectId } }),
    exams: await listSubjectExams({ data: { subjectId: params.subjectId } }),
  }),
  component: ExamsIndex,
})

function formatDuration(seconds: number) {
  const minutes = Math.round(seconds / 60)
  if (minutes >= 60) return `${Math.round(minutes / 60)} hours`
  return `${minutes} minutes`
}

function ExamsIndex() {
  const { subject, exams } = Route.useLoaderData()

  return (
    <main className="app-shell">
      <AppNav subjectId={subject.id} />
      <section className="subject-hero compact">
        <p>{subject.shortTitle}</p>
        <h1>Exams</h1>
        <span>Timed practice sets with answer keys kept server-side until submission.</span>
      </section>
      <section className="exam-grid" aria-label="Subject exams">
        {exams.map((exam) => (
          <Link
            key={exam.id}
            to="/subjects/$subjectId/exams/$examId"
            params={{ subjectId: subject.id, examId: exam.id }}
            className="exam-card"
          >
            <span>{formatDuration(exam.durationSeconds)}</span>
            <h2>{exam.title}</h2>
            <p>{exam.description}</p>
            <dl>
              <div>
                <dt>MCQ</dt>
                <dd>{exam.choiceCount}</dd>
              </div>
              <div>
                <dt>Written</dt>
                <dd>{exam.writtenCount}</dd>
              </div>
            </dl>
          </Link>
        ))}
      </section>
    </main>
  )
}
