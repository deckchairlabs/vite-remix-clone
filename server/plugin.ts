import path from 'path'
import * as vite from 'vite'
import { FastifyPluginAsync } from 'fastify'
import middie from 'middie'
import FastifyPlugin from 'fastify-plugin'
import fastifyFormBody from 'fastify-formbody'
import fastifyStatic from 'fastify-static'
import { createPageRender } from 'vite-plugin-ssr'
import isFetchResponse from '../utils/isFetchResponse'

type PluginOptions = {
  root?: string
}

const isProduction = process.env.NODE_ENV === 'production'

const viteSsrPlugin: FastifyPluginAsync<PluginOptions> = FastifyPlugin(
  async (fastify, { root = process.cwd() }) => {
    let viteDevServer

    await fastify.register(fastifyFormBody)

    await fastify.register(fastifyStatic, {
      root: path.resolve(root, 'public'),
      index: false,
      prefix: '/public/',
    })

    if (isProduction) {
      await fastify.register(fastifyStatic, {
        root: path.resolve(root, 'dist/client'),
        prefix: '/assets/',
        index: false,
        immutable: true,
        decorateReply: false,
      })
    } else {
      await fastify.register(middie)

      viteDevServer = await vite.createServer({
        root,
        server: { middlewareMode: true },
      })

      fastify.use(viteDevServer.middlewares)
    }

    const renderPage = createPageRender({ viteDevServer, isProduction, root })

    fastify.all('*', async (request, reply) => {
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

        return reply
          .status(result.renderResult?.status || result.statusCode || 400)
          .send(result.renderResult.body)
      }

      return reply.status(404).send()
    })
  }
)

export default viteSsrPlugin
