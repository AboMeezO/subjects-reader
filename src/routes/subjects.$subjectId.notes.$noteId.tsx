import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useId, useMemo, useState } from 'react'
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

function MermaidDiagram({ chart }: { chart: string }) {
  const reactId = useId()
  const diagramId = useMemo(() => `mermaid-${reactId.replace(/[^a-zA-Z0-9_-]/g, '')}`, [reactId])
  const [svg, setSvg] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function renderDiagram() {
      try {
        const mermaid = (await import('mermaid')).default
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: 'dark',
          themeVariables: {
            background: '#15181d',
            primaryColor: '#1f2a32',
            primaryTextColor: '#eef2f5',
            primaryBorderColor: '#e2b75d',
            lineColor: '#9aa6b2',
            secondaryColor: '#223042',
            tertiaryColor: '#101318',
          },
        })
        const rendered = await mermaid.render(diagramId, chart)
        if (!cancelled) {
          setSvg(rendered.svg)
          setError('')
        }
      } catch (renderError) {
        if (!cancelled) {
          setSvg('')
          setError(renderError instanceof Error ? renderError.message : 'Unable to render diagram')
        }
      }
    }

    renderDiagram()

    return () => {
      cancelled = true
    }
  }, [chart, diagramId])

  if (error) {
    return (
      <pre className="mermaid-fallback">
        <code>{chart}</code>
      </pre>
    )
  }

  return (
    <div
      className="mermaid-diagram"
      dir="ltr"
      aria-label="Study diagram"
      dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
    >
      {!svg ? <span>Rendering diagram...</span> : null}
    </div>
  )
}

function NoteReader() {
  const { subject, notes, selected, content } = Route.useLoaderData()
  const isRtl = subject.language === 'ar'

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
          <article className="markdown-body" dir={isRtl ? 'rtl' : 'ltr'} lang={subject.language}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkBreaks]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                code({ children, className, ...props }) {
                  const chart = String(children).replace(/\n$/, '')
                  if (/\blanguage-mermaid\b/.test(className ?? '')) {
                    return <MermaidDiagram chart={chart} />
                  }

                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </article>
        </section>
      </div>
    </NotesLayout>
  )
}
