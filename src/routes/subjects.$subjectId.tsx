import { Outlet, createFileRoute } from '@tanstack/react-router'
import { AppNav } from '../components/AppNav'
import { getSubject } from '../server/subjects'

export const Route = createFileRoute('/subjects/$subjectId')({
  loader: ({ params }) => getSubject({ data: { subjectId: params.subjectId } }),
  component: SubjectLayout,
})

function SubjectLayout() {
  const subject = Route.useLoaderData()

  return (
    <main className="app-shell">
      <AppNav subjectId={subject.id} />
      <Outlet />
    </main>
  )
}
