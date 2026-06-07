import { createServerFn } from '@tanstack/react-start'
import { readdir, readFile, stat } from 'node:fs/promises'

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

const rootDirectory = process.cwd()
const notesDirectory = `${rootDirectory}/content/notes`

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

async function getMarkdownFiles() {
  const entries = await readdir(notesDirectory, { withFileTypes: true })
  const files = entries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.md'))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  return Promise.all(
    files.map(async (filename) => {
      const fileStat = await stat(`${notesDirectory}/${filename}`)
      return {
        slug: slugFromFilename(filename),
        title: titleFromFilename(filename),
        filename,
        size: fileStat.size,
        updatedAt: fileStat.mtime.toISOString(),
      }
    }),
  )
}

export const getDocumentPayload = createServerFn({ method: 'GET' })
  .validator((input: unknown) => {
    if (!input || typeof input !== 'object' || !('slug' in input)) {
      return { slug: undefined as string | undefined }
    }

    const slug = (input as { slug?: unknown }).slug
    return { slug: typeof slug === 'string' ? slug : undefined }
  })
  .handler(async ({ data }): Promise<DocumentPayload> => {
    const documents = await getMarkdownFiles()
    const selected =
      documents.find((document) => document.slug === data.slug) ?? documents[0] ?? null

    if (!selected) {
      return { documents, selected: null, content: '' }
    }

    const filePath = `${notesDirectory}/${selected.filename}`
    const content = await readFile(filePath, 'utf8')

    return { documents, selected, content }
  })
