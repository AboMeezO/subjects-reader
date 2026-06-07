import { Link, createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { exams, getExam } from '../examData'

type SearchParams = {
  exam?: string
}

export const Route = createFileRoute('/exams')({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    exam: typeof search.exam === 'string' ? search.exam : undefined,
  }),
  loaderDeps: ({ search }) => ({ exam: search.exam }),
  loader: ({ deps }) => getExam(deps.exam),
  component: ExamsPage,
})

function ExamsPage() {
  const exam = Route.useLoaderData()
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const score = useMemo(() => {
    return exam.questions.reduce((total, question) => {
      return answers[question.id] === question.answerIndex ? total + 1 : total
    }, 0)
  }, [answers, exam.questions])

  return (
    <main className="exam-shell">
      <nav className="top-nav" aria-label="Primary">
        <Link to="/">Notes</Link>
        <Link to="/exams" aria-current="page">
          Exams
        </Link>
      </nav>
      <section className="exam-frame">
        <div className="exam-heading">
          <p>Exam mode</p>
          <h1>{exam.title}</h1>
          <span>{exam.status === 'ready' ? `${exam.questions.length} questions` : 'Source needed'}</span>
        </div>

        {exam.status === 'source-needed' ? (
          <section className="exam-source-state">
            <h2>Question and answer PDFs are not ready yet</h2>
            <p>{exam.description}</p>
            <div className="source-list">
              {exam.sources.map((source) => (
                <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                  <strong>{source.label}</strong>
                  <span>{source.note}</span>
                </a>
              ))}
            </div>
          </section>
        ) : (
          <>
            <div className="exam-score">
              Score: {score}/{exam.questions.length}
            </div>
            <form className="question-list">
              {exam.questions.map((question, questionIndex) => (
                <fieldset key={question.id} className="question-block">
                  <legend>
                    {questionIndex + 1}. {question.prompt}
                  </legend>
                  {question.choices.map((choice, choiceIndex) => (
                    <label key={choice}>
                      <input
                        type="radio"
                        name={question.id}
                        checked={answers[question.id] === choiceIndex}
                        onChange={() =>
                          setAnswers((currentAnswers) => ({
                            ...currentAnswers,
                            [question.id]: choiceIndex,
                          }))
                        }
                      />
                      <span>{choice}</span>
                    </label>
                  ))}
                </fieldset>
              ))}
            </form>
          </>
        )}
      </section>
    </main>
  )
}
