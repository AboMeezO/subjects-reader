import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/subjects/$subjectId/exams')({
  component: ExamsLayout,
})

function ExamsLayout() {
  return <Outlet />
}
