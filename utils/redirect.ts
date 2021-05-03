import { Response } from 'cross-fetch'

export default function redirect(location: string, status: number = 303) {
  return new Response(null, {
    headers: {
      location,
    },
    status,
  })
}
