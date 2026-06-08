import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import appCss from '../styles.css?url'
import { getQueryClient } from '../queryClient'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Subjects Reader' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <html lang="en" dir="auto">
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        <Scripts />
      </body>
    </html>
  )
}
