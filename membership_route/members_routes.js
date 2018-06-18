'use strict'

const _ = require('lodash')

const memberService = require('./members_service')

async function listMembers (req, res) {
  try {
    const members = await memberService.listMembers()

    if (_.isEmpty(members)) {
      return res.sendStatus(404)
    }
    return res.json(members)
  } catch (err) {
    res.status(500)
    return res.send(err.message)
  }
}

async function listMember (req, res) {
  const { id } = req.params

  try {
    const member = await memberService.listMember(id)

    if (_.isEmpty(member)) {
      return res.sendStatus(404)
    }
    return res.json(member)
  } catch (err) {
    res.status(500)
    return res.send(err.message)
  }
}

module.exports = {
  listMembers,
  listMember
}
