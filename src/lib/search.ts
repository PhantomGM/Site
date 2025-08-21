import { Guild, Post } from '@prisma/client'
import { canViewPost } from './acl'

export function filterVisiblePosts(params: {
  posts: (Post & { guild?: Guild | null })[]
  viewerId: string
  viewerGuildIds: string[]
  friendIds: string[]
}) {
  const { posts, viewerId, viewerGuildIds, friendIds } = params
  return posts.filter(post =>
    canViewPost({ viewerId, post, viewerGuildIds, friendIds })
  )
}

export function filterVisibleGuilds(guilds: Guild[], viewerGuildIds: string[]) {
  return guilds.filter(g => g.privacy === 'PUBLIC' || viewerGuildIds.includes(g.id))
}
