import React from 'react'
import { PageLayout } from './PageLayout'

export default function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Superfly</title>
      </head>
      <body>
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  )
}
