import path from 'path'
import * as vite from 'vite'
import fastify from 'fastify'
import fastifyFormBody from 'fastify-formbody'
import fastifyStatic from 'fastify-static'
import middie from 'middie'
import { createPageRender } from 'vite-plugin-ssr'
import { logger } from './logger'
import isFetchResponse from '../utils/isFetchResponse'

const isProduction = process.env.NODE_ENV === 'production'
const root = `${__dirname}/..`

const app = fastify({
  requestIdLogLabel: 'requestId',
  disableRequestLogging: !isProduction,
  logger,
})

const main = async () => {
  let viteDevServer

  await app.register(fastifyFormBody)

  await app.register(fastifyStatic, {
    root: path.resolve(root, 'public'),
    index: false,
    prefix: '/public/',
  })

  if (isProduction) {
    await app.register(fastifyStatic, {
      root: path.resolve(root, 'dist/client'),
      prefix: '/assets/',
      index: false,
      immutable: true,
      decorateReply: false,
    })
  } else {
    viteDevServer = await vite.createServer({
      root,
      server: { middlewareMode: true },
    })
    await app.register(middie)
    app.use(viteDevServer.middlewares)
  }

  const renderPage = createPageRender({ viteDevServer, isProduction, root })

  app.all('*', async (request, reply) => {
    const url = request.url

    if (url.endsWith('/favicon.ico')) {
      return reply.status(204).send()
    }

    const contextProps = {
      request,
    }

    const result = await renderPage({ url, contextProps })

    if (isFetchResponse(result.renderResult)) {
      result.renderResult.headers.forEach((value, name) => {
        reply.header(name, value)
      })

      return (
        reply
          //@ts-ignore
          .status(result.renderResult?.status || result.statusCode || 400)
          .send(result.renderResult.body)
      )
    }

    return reply.send(url)
  })

  const port = process.env.PORT || 3000
  await app.listen(port, '0.0.0.0')
}

main()
