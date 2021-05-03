import { Post } from '@prisma/client'
import { x } from '@xstyled/emotion'
import React from 'react'
import PageTitle from '../components/PageTitle'

type PostsPageProps = {
  posts: Post[]
}

export default function Posts({ posts }: PostsPageProps) {
  return (
    <>
      <PageTitle>Blog</PageTitle>

      {posts.map((post) => {
        return (
          <x.div key={post.id} marginBottom={3}>
            <x.h2 fontSize="xl">{post.title}</x.h2>
            <div>{post.content}</div>
          </x.div>
        )
      })}

      <form method="post">
        <fieldset>
          <legend>New Blog Post</legend>
          <div>
            <input type="text" name="title" placeholder="Title" />
          </div>
          <div>
            <textarea name="content" placeholder="Content"></textarea>
          </div>
        </fieldset>
        <button type="submit">Create</button>
      </form>
    </>
  )
}
