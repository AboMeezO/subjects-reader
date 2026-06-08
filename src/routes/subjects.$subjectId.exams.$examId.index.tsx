import { Link, createFileRoute } from '@tanstack/react-router'
import { Route as ExamRoute } from './subjects.$subjectId.exams.$examId'

export const Route = createFileRoute('/subjects/$subjectId/exams/$examId/')({
  component: ExamDetail,
})

function formatDuration(seconds: number) {
  const minutes = Math.round(seconds / 60)
  if (minutes >= 60) return `${Math.round(minutes / 60)} hours`
  return `${minutes} minutes`
}

function ExamDetail() {
  const exam = ExamRoute.useLoaderData()

  return (
    <section className="exam-detail">
      <p>Exam setup</p>
      <h1>{exam.title}</h1>
      <span>{exam.description}</span>
      <dl>
        <div>
          <dt>Duration</dt>
          <dd>{formatDuration(exam.durationSeconds)}</dd>
        </div>
        <div>
          <dt>MCQ</dt>
          <dd>{exam.choiceCount}</dd>
        </div>
        <div>
          <dt>Written</dt>
          <dd>{exam.writtenCount}</dd>
        </div>
      </dl>
      <Link
        className="primary-action"
        to="/subjects/$subjectId/exams/$examId/attempt"
        params={{ subjectId: exam.subjectId, examId: exam.id }}
      >
        Start attempt
      </Link>
    </section>
  )
}
