import { FastifyRequest } from 'fastify'
import { Request, Headers } from 'cross-fetch'

export default function createRequest(fastifyRequest: FastifyRequest): Request {
  const requestHeaders = new Headers()

  Object.entries(fastifyRequest.headers).forEach(([name, value]) => {
    if (typeof value === 'string') {
      requestHeaders.append(name, value)
    }
  })

  return new Request(fastifyRequest.url, {
    method: fastifyRequest.method,
    headers: requestHeaders,
  })
}
