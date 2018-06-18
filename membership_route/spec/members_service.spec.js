'use strict'

const sinon = require('sinon')
const proxyquire = require('proxyquire')
const Promise = require('bluebird')

require('should-sinon')

describe('/members_service', function () {
  describe('listMembers', function () {
    it('should return with SUCCESS', function (done) {
      const response = [
        {
          id: 1,
          name: 'Teste Nome 1'
        },
        {
          id: 2,
          name: 'Teste Nome 2'
        }
      ]

      const service = proxyquire('../members_service', {
        './members_db': {
          getMembersFromDb: sinon.stub().resolves(response)
        }
      })

      Promise.coroutine(function * () {
        const members = yield service.listMembers()
        members.should.deepEqual(response)

        done()
      })()
    })
  })

  describe('listMember', function () {
    it('should return with SUCCESS', function (done) {
      const response = {
        id: 1,
        name: 'Teste Nome 1'
      }

      const service = proxyquire('../members_service', {
        './members_db': {
          getMemberFromDb: sinon.stub().resolves(response)
        }
      })

      Promise.coroutine(function * () {
        const member = yield service.listMember(1)
        member.should.deepEqual(response)

        done()
      })()
    })
  })
})
