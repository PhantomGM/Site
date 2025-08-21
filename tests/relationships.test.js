const test = require('node:test')
const assert = require('node:assert/strict')

function respondRequest(request, accept) {
  return {
    type: accept ? 'FRIEND' : 'REQUEST',
    status: accept ? 'ACCEPTED' : 'REJECTED'
  }
}

test('friend request accepted becomes FRIEND', () => {
  const res = respondRequest({ type: 'REQUEST', status: 'PENDING' }, true)
  assert.equal(res.type, 'FRIEND')
  assert.equal(res.status, 'ACCEPTED')
})

