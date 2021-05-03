import ReactDOMServer from 'react-dom/server'
import React from 'react'
import { ContextProps } from './types'
import { Headers, Response } from 'cross-fetch'
import Root from './RootServer'
import redirect from '../../utils/redirect'

export const passToClient = ['pageProps']

export async function render({
  Page,
  contextProps,
}: {
  Page: React.ComponentType
  contextProps: ContextProps<any>
}) {
  /**
   * If we received a POST request and we are now at the point of rendering
   * We should redirect back to the original URL, prevent back/refresh re-posting
   * of data.
   */
  if (contextProps.request?.method === 'POST') {
    return redirect(contextProps.request.url)
  }

  const markup = ReactDOMServer.renderToString(
    <Root Component={Page} {...contextProps.pageProps} />
  )

  const responseStatusCode = 200
  const responseHeaders = new Headers()

  responseHeaders.append('content-type', 'text/html')

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}
