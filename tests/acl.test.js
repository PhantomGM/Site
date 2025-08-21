const test = require('node:test')
const assert = require('node:assert/strict')
const { canViewPost } = require('../src/lib/acl.js')

const post = { id: '1', authorId: 'b', scope: 'PROFILE', visibility: 'FRIENDS' }

test('owner can view own private post', () => {
  assert.equal(canViewPost({ viewerId: 'b', post, viewerGuildIds: [], friendIds: [] }), true)
})

test('friend can view friends-only post', () => {
  assert.equal(canViewPost({ viewerId: 'a', post, viewerGuildIds: [], friendIds: ['b'] }), true)
})

test('stranger cannot view friends-only post', () => {
  assert.equal(canViewPost({ viewerId: 'c', post, viewerGuildIds: [], friendIds: [] }), false)
})
