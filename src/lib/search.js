const { canViewPost } = require('./acl.js')

function filterVisiblePosts({ posts, viewerId, viewerGuildIds, friendIds }) {
  return posts.filter(post =>
    canViewPost({ viewerId, post, viewerGuildIds, friendIds })
  )
}

function filterVisibleGuilds(guilds, viewerGuildIds) {
  return guilds.filter(g => g.privacy === 'PUBLIC' || viewerGuildIds.includes(g.id))
}

module.exports = { filterVisiblePosts, filterVisibleGuilds }
