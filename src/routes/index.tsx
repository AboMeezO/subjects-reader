import { Link, createFileRoute } from '@tanstack/react-router'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import { getDocumentPayload } from '../documents'

type SearchParams = {
  file?: string
}

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    file: typeof search.file === 'string' ? search.file : undefined,
  }),
  loaderDeps: ({ search }) => ({ file: search.file }),
  loader: ({ deps }) => getDocumentPayload({ data: { slug: deps.file } }),
  component: Home,
})

function formatBytes(size: number) {
  if (size < 1024) return `${size} B`
  return `${Math.round(size / 1024)} KB`
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value))
}

function Home() {
  const { documents, selected, content } = Route.useLoaderData()

  return (
    <main className="reader-shell">
      <aside className="reader-sidebar" aria-label="Documents">
        <div className="reader-brand">
          <h1>Subjects Reader</h1>
          <p>{documents.length} Markdown files</p>
        </div>
        <nav className="document-list">
          {documents.map((document) => (
            <Link
              key={document.slug}
              className="document-link"
              to="/"
              search={{ file: document.slug }}
              aria-current={selected?.slug === document.slug ? 'page' : undefined}
            >
              <strong dir="auto">{document.title}</strong>
              <span>{formatBytes(document.size)}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <section className="reader-main">
        <div className="document-frame">
          {selected ? (
            <>
              <div className="document-meta">
                <span dir="auto">{selected.filename}</span>
                <span>{formatDate(selected.updatedAt)}</span>
              </div>
              <article className="markdown-body" dir="auto">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkBreaks]}
                  rehypePlugins={[rehypeRaw, rehypeHighlight]}
                >
                  {content}
                </ReactMarkdown>
              </article>
            </>
          ) : (
            <div className="empty-state">No Markdown files were found.</div>
          )}
        </div>
      </section>
    </main>
  )
}
