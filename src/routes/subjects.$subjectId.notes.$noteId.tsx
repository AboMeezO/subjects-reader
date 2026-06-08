import { createFileRoute } from '@tanstack/react-router'
import rehypeHighlight from 'rehype-highlight'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import { getSubjectNotes } from '../server/subjects'
import { NotesLayout, NotesSidebar } from './subjects.$subjectId.notes'

export const Route = createFileRoute('/subjects/$subjectId/notes/$noteId')({
  loader: ({ params }) =>
    getSubjectNotes({ data: { subjectId: params.subjectId, noteId: params.noteId } }),
  component: NoteReader,
})

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value))
}

function NoteReader() {
  const { subject, notes, selected, content } = Route.useLoaderData()

  return (
    <NotesLayout>
      <div className="study-workspace">
        <NotesSidebar subjectId={subject.id} notes={notes} selectedId={selected.id} />
        <section className="reader-panel">
          <div className="document-meta">
            <span>{subject.shortTitle}</span>
            <span>{selected.filename}</span>
            <span>{formatDate(selected.updatedAt)}</span>
          </div>
          <article className="markdown-body" dir="auto">
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[rehypeHighlight]}>
              {content}
            </ReactMarkdown>
          </article>
        </section>
      </div>
    </NotesLayout>
  )
}
