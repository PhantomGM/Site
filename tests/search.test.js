const test = require('node:test')
const assert = require('node:assert/strict')
const { filterVisiblePosts, filterVisibleGuilds } = require('../src/lib/search.js')

test('filterVisibleGuilds excludes private guilds for unauthorized user', () => {
  const guilds = [
    { id: 'g1', privacy: 'PRIVATE' },
    { id: 'g2', privacy: 'PUBLIC' }
  ]
  const visible = filterVisibleGuilds(guilds, [])
  assert.equal(visible.length, 1)
  assert.equal(visible[0].id, 'g2')
})

test('filterVisiblePosts excludes private posts for unauthorized user', () => {
  const posts = [
    { id: 'p1', visibility: 'PUBLIC', scope: 'PROFILE', authorId: 'u1' },
    { id: 'p2', visibility: 'FRIENDS', scope: 'PROFILE', authorId: 'u2' },
    { id: 'p3', visibility: 'PUBLIC', scope: 'GUILD', guildId: 'g1', authorId: 'u3', guild: { id: 'g1', privacy: 'PRIVATE' } }
  ]
  const visible = filterVisiblePosts({ posts, viewerId: '', viewerGuildIds: [], friendIds: [] })
  assert.equal(visible.length, 1)
  assert.equal(visible[0].id, 'p1')
})
