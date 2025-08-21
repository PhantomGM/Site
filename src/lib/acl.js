function canViewPost({ viewerId, post, viewerGuildIds, friendIds }) {
  if (post.visibility === 'PUBLIC') {
    if (post.scope === 'GUILD') {
      return viewerGuildIds.includes(post.guildId)
    }
    return true
  }
  if (post.authorId === viewerId) return true
  return friendIds.includes(post.authorId)
}

function canManageGuild(role) {
  return role === 'OWNER' || role === 'OFFICER'
}

module.exports = { canViewPost, canManageGuild }
