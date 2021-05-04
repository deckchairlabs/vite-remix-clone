import fastify from 'fastify'
import { logger } from './logger'
import viteSsrPlugin from './plugin'

const isProduction = process.env.NODE_ENV === 'production'

const app = fastify({
  requestIdLogLabel: 'requestId',
  disableRequestLogging: !isProduction,
  logger,
})

const main = async () => {
  await app.register(viteSsrPlugin)

  const port = process.env.PORT || 3000
  await app.listen(port, '0.0.0.0')
}

main()
