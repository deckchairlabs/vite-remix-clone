import prisma from '../prisma'
import { ContextProps } from './_default/types'

export async function addContextProps({
  contextProps,
}: {
  contextProps: ContextProps<{ title: string }>
}) {
  const { request } = contextProps

  if (request?.method === 'POST' && request.body) {
    await prisma.post.create({
      data: {
        title: request.body.title,
      },
    })
  }

  const posts = await prisma.post.findMany()

  return { pageProps: { posts } }
}
