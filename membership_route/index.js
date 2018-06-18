'use strict'

const express = require('express')
const routes = require('./members_routes')

function getRouter () {
  const router = express.Router({ mergeParams: true })

  router.route('/members').get(routes.listMembers)
  router.route('/members/:id').get(routes.listMember)

  return router
}

module.exports = {
  getRouter
}
