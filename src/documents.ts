type DocumentSummary = {
  slug: string
  title: string
  filename: string
  size: number
  updatedAt: string
}

type DocumentPayload = {
  documents: Array<DocumentSummary>
  selected: DocumentSummary | null
  content: string
}

const markdownFiles = import.meta.glob('../content/notes/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function titleFromFilename(filename: string) {
  return filename
    .replace(/\.md$/i, '')
    .replace(/^\d+-/, '')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function slugFromFilename(filename: string) {
  return filename.replace(/\.md$/i, '')
}

const documents = Object.entries(markdownFiles)
  .map(([filePath, content]) => {
    const filename = filePath.split('/').pop() ?? filePath

    return {
      content,
      summary: {
        slug: slugFromFilename(filename),
        title: titleFromFilename(filename),
        filename,
        size: new Blob([content]).size,
        updatedAt: '2026-06-04T12:09:00.000Z',
      },
    }
  })
  .sort((a, b) => a.summary.filename.localeCompare(b.summary.filename, undefined, { numeric: true }))

export function getDocumentPayload(slug?: string): DocumentPayload {
  const selectedDocument =
    documents.find((document) => document.summary.slug === slug) ?? documents[0] ?? null

  return {
    documents: documents.map((document) => document.summary),
    selected: selectedDocument?.summary ?? null,
    content: selectedDocument?.content ?? '',
  }
}
