import { Response } from 'cross-fetch'

export default function isFetchResponse(response: any): response is Response {
  return response instanceof Response
}
