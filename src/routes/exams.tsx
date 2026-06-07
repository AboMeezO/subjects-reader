import { Link, createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { getExam } from '../examData'

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
  const [writtenAnswers, setWrittenAnswers] = useState<Record<string, string>>({})
  const [showAnswers, setShowAnswers] = useState(false)
  const choiceQuestions = exam.questions.filter((question) => question.type === 'choice')
  const writtenQuestions = exam.questions.filter((question) => question.type === 'written')
  const score = useMemo(() => {
    return choiceQuestions.reduce((total, question) => {
      return answers[question.id] === question.answerIndex ? total + 1 : total
    }, 0)
  }, [answers, choiceQuestions])

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
          <span>
            {exam.duration} · {choiceQuestions.length} MCQ · {writtenQuestions.length} written
          </span>
        </div>

        <section className="exam-intro">
          <p>{exam.description}</p>
          <button type="button" onClick={() => setShowAnswers((current) => !current)}>
            {showAnswers ? 'Hide answers' : 'Show answers'}
          </button>
        </section>

        <div className="exam-score">
          Score: {score}/{choiceQuestions.length}
        </div>

        <form className="question-list">
          {choiceQuestions.map((question, questionIndex) => (
            <fieldset key={question.id} className="question-block">
              <legend>
                <span>{question.section}</span>
                {questionIndex + 1}. {question.prompt}
              </legend>
              {question.choices.map((choice, choiceIndex) => {
                const selected = answers[question.id] === choiceIndex
                const correct = question.answerIndex === choiceIndex

                return (
                  <label
                    key={choice}
                    data-state={showAnswers && correct ? 'correct' : selected ? 'selected' : undefined}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      checked={selected}
                      onChange={() =>
                        setAnswers((currentAnswers) => ({
                          ...currentAnswers,
                          [question.id]: choiceIndex,
                        }))
                      }
                    />
                    <span>{choice}</span>
                  </label>
                )
              })}
            </fieldset>
          ))}

          {exam.readings.map((reading) => (
            <section key={reading.title} className="reading-block">
              <h2>{reading.title}</h2>
              {reading.text.split('\n\n').map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}

          {writtenQuestions.map((question, questionIndex) => (
            <fieldset key={question.id} className="question-block written-question">
              <legend>
                <span>{question.section}</span>
                {choiceQuestions.length + questionIndex + 1}. {question.prompt}
              </legend>
              <textarea
                value={writtenAnswers[question.id] ?? ''}
                onChange={(event) =>
                  setWrittenAnswers((currentAnswers) => ({
                    ...currentAnswers,
                    [question.id]: event.target.value,
                  }))
                }
                rows={5}
              />
              <p>{question.points} points</p>
              {showAnswers ? (
                <div className="model-answer">
                  <strong>Model answer</strong>
                  <span>{question.modelAnswer}</span>
                </div>
              ) : null}
            </fieldset>
          ))}
        </form>
      </section>
    </main>
  )
}
