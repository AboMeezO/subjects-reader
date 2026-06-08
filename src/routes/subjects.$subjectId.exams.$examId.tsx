import { Outlet, createFileRoute } from '@tanstack/react-router'
import { getSubjectExam } from '../server/exams'

export const Route = createFileRoute('/subjects/$subjectId/exams/$examId')({
  loader: ({ params }) =>
    getSubjectExam({ data: { subjectId: params.subjectId, examId: params.examId } }),
  component: ExamLayout,
})

function ExamLayout() {
  return <Outlet />
}
