import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const clientDirectory = join(process.cwd(), 'dist', 'client')

async function cleanHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })

  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = join(directory, entry.name)

      if (entry.isDirectory()) {
        await cleanHtmlFiles(entryPath)
        return
      }

      if (!entry.isFile() || !entry.name.endsWith('.html')) return

      const html = await readFile(entryPath, 'utf8')
      const closingIndex = html.indexOf('</html>')
      if (closingIndex === -1) return

      const cleanHtml = html.slice(0, closingIndex + '</html>'.length)
      if (cleanHtml !== html) {
        await writeFile(entryPath, cleanHtml)
      }
    }),
  )
}

await cleanHtmlFiles(clientDirectory)
