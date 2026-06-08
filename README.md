# Subjects Reader

A local multi-subject study app for notes and timed exam practice.

The app organizes content by subject, renders Markdown notes, and runs exam attempts through TanStack Start server functions so answer keys stay server-side until submission.

## Structure

```text
content/subjects/<subject>/subject.json   Subject metadata
content/subjects/<subject>/notes          Markdown notes
content/subjects/<subject>/reference      Reference files
src/server                                Server functions and server-only data
src/routes                                TanStack Router file routes
```

## Run

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```
