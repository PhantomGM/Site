const test = require('node:test')
const assert = require('node:assert/strict')
const { canManageGuild } = require('../src/lib/acl.js')

test('owner can manage guild membership', () => {
  assert.equal(canManageGuild('OWNER'), true)
})

test('officer can manage guild membership', () => {
  assert.equal(canManageGuild('OFFICER'), true)
})

test('member cannot manage guild membership', () => {
  assert.equal(canManageGuild('MEMBER'), false)
})
