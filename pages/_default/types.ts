import { FastifyRequest } from 'fastify'

export type ContextProps<RequestBody = string> = {
  pageProps: {}
  request?: FastifyRequest<{
    Body?: RequestBody
  }>
}
