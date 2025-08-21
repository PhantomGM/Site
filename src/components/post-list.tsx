'use client'

import { useEffect, useState } from 'react'

interface Post {
  id: string
  body: string
  guild?: { name: string } | null
}

interface PostListProps {
  userId: string
}

export default function PostList({ userId }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const res = await fetch(`/api/feed?user=${userId}&page=${page}`)
      const data = await res.json()
      if (data.length === 0) {
        setHasMore(false)
      } else {
        setPosts(prev => [...prev, ...data])
      }
      setLoading(false)
    }
    fetchPosts()
  }, [page, userId])

  const loadMore = () => {
    if (!loading && hasMore) setPage(p => p + 1)
  }

  const likePost = async (postId: string) => {
    await fetch(`/api/posts/${postId}/react`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, type: 'LIKE' })
    })
  }

  const commentOnPost = async (postId: string) => {
    const body = prompt('Enter comment')
    if (!body) return
    await fetch(`/api/posts/${postId}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ authorId: userId, body })
    })
  }

  return (
    <div>
      {posts.map(post => (
        <div key={post.id} className="border p-4 mb-2">
          <p>{post.body}</p>
          {post.guild && <p className="text-sm text-gray-500">Guild: {post.guild.name}</p>}
          <div className="mt-2 flex gap-2">
            <button onClick={() => likePost(post.id)}>Like</button>
            <button onClick={() => commentOnPost(post.id)}>Comment</button>
          </div>
        </div>
      ))}
      {hasMore && (
        <button disabled={loading} onClick={loadMore} className="mt-4">
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  )
}

