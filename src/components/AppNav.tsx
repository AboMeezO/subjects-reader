import { Link } from '@tanstack/react-router'

type AppNavProps = {
  subjectId?: string
}

export function AppNav({ subjectId }: AppNavProps) {
  return (
    <nav className="app-nav" aria-label="Primary">
      <Link to="/">Subjects</Link>
      {subjectId ? (
        <>
          <Link to="/subjects/$subjectId/notes" params={{ subjectId }}>
            Notes
          </Link>
          <Link to="/subjects/$subjectId/exams" params={{ subjectId }}>
            Exams
          </Link>
        </>
      ) : null}
    </nav>
  )
}
