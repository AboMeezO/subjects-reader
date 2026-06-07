# Subjects Reader

A local web reader for the Action Pack 12 study notes. It exists so the Markdown files can be opened from a phone through a browser without copying the documents around.

> باختصار مكسل أضل أنسخ ملفات من الكمبيوتر للتلفون وبدي أروح أدرس بالصالة :)

The app scans `content/notes`, lists the Markdown files in the sidebar, and renders the selected file as readable HTML. Source study files are not edited or exposed as download links.

Built with TanStack Start, React, TypeScript, pnpm, Tailwind CSS, and react-markdown.

## Structure

```text
content/notes       Markdown study files
content/reference   Source reference files
src                 TanStack Start app
```

## Run

```bash
pnpm install
pnpm dev
```
