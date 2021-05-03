import React from 'react'
import { getPage } from 'vite-plugin-ssr/client'
import Document from './Document'

export default React.lazy(async () => {
  const { Page, contextProps } = await getPage()

  return {
    default() {
      return (
        <Document>
          <Page {...contextProps.pageProps} />
        </Document>
      )
    },
  }
})
