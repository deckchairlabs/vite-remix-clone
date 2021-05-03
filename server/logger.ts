import pino from 'pino'

function severity(label: string) {
  switch (label) {
    case 'trace':
      return 'DEBUG'
    case 'debug':
      return 'DEBUG'
    case 'info':
      return 'INFO'
    case 'warn':
      return 'WARNING'
    case 'error':
      return 'ERROR'
    case 'fatal':
      return 'CRITICAL'
    default:
      return 'DEFAULT'
  }
}

function level(label: string, number: any) {
  return { severity: severity(label) }
}

export const logger = pino({
  formatters: {
    level,
  },
  prettyPrint: process.env.NODE_ENV === 'development',
  base: null,
  messageKey: 'message',
  timestamp: false,
  level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL.toLowerCase() : 'debug',
})
