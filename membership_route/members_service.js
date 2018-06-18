'use strict'

const membersDB = require('./members_db')

async function listMembers () {
  const members = await membersDB.getMembersFromDb()
  return members
}

async function listMember (memberId) {
  const member = await membersDB.getMemberFromDb(memberId)
  return member
}

module.exports = {
  listMembers,
  listMember
}
