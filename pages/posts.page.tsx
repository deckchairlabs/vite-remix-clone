import { Post } from '@prisma/client'
import { x } from '@xstyled/emotion'
import React from 'react'

type PostsPageProps = {
  posts: Post[]
}

export default function Posts({ posts }: PostsPageProps) {
  return (
    <>
      <h1>Blog</h1>

      {posts.map((post) => {
        return (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <div>{post.content}</div>
            <x.hr my={3} borderTop="1px solid" />
          </div>
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
