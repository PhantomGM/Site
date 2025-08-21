import { Post, Guild, GuildPrivacy, PostVisibility } from '@prisma/client'

/**
 * Simple ACL check for whether a user can view a post.
 * For guild posts, checks membership and guild privacy.
 */
export function canViewPost(params: {
  viewerId: string
  post: Post & { guild?: Guild | null; authorId: string }
  viewerGuildIds: string[]
  friendIds: string[]
}): boolean {
  const { viewerId, post, viewerGuildIds, friendIds } = params

  if (post.visibility === PostVisibility.PUBLIC) {
    if (post.scope === 'GUILD') {
      if (!post.guild) return false
      if (post.guild.privacy === GuildPrivacy.PUBLIC) {
        return viewerGuildIds.includes(post.guildId!)
      }
      return viewerGuildIds.includes(post.guildId!)
    }
    return true
  }

  // FRIENDS visibility
  if (post.authorId === viewerId) return true
  return friendIds.includes(post.authorId)
}
