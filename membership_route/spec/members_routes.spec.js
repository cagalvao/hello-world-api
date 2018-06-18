'use strict'

const sinon = require('sinon')
const proxyquire = require('proxyquire')

require('should-sinon')

describe('/members_routes', function () {
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

      const route = proxyquire('../members_routes', {
        './members_service': {
          listMembers: sinon.stub().resolves(response)
        }
      })

      const req = {}

      const res = {
        json: (list) => {
          list.should.deepEqual(response)
          done()
        }
      }

      route.listMembers(req, res)
    })

    it('should return with NOT FOUND', function (done) {
      const route = proxyquire('../members_routes', {
        './members_service': {
          listMembers: sinon.stub().resolves([])
        }
      })

      const req = {}

      const res = {
        sendStatus: (code) => {
          code.should.be.equal(404)
          done()
        }
      }

      route.listMembers(req, res)
    })

    it('should return with ERROR', function (done) {
      const route = proxyquire('../members_routes', {
        './members_service': {
          listMembers: sinon.stub().rejects(Error('generic error'))
        }
      })

      const req = {}

      const res = {
        status: (code) => {
          code.should.be.equal(500)
        },
        send: (error) => {
          error.should.be.equal('generic error')
          done()
        }
      }

      route.listMembers(req, res)
    })
  })

  describe('listMember', function () {
    it('should return with SUCCESS', function (done) {
      const response = {
        id: 1,
        name: 'Teste Nome 1'
      }

      const route = proxyquire('../members_routes', {
        './members_service': {
          listMember: sinon.stub().resolves(response)
        }
      })

      const req = {
        params: {
          id: 1
        }
      }

      const res = {
        json: (object) => {
          object.should.deepEqual(response)
          done()
        }
      }

      route.listMember(req, res)
    })

    it('should return with NOT FOUND', function (done) {
      const route = proxyquire('../members_routes', {
        './members_service': {
          listMember: sinon.stub().resolves({})
        }
      })

      const req = {
        params: {
          id: 1
        }
      }

      const res = {
        sendStatus: (code) => {
          code.should.be.equal(404)
          done()
        }
      }

      route.listMember(req, res)
    })

    it('should return with ERROR', function (done) {
      const route = proxyquire('../members_routes', {
        './members_service': {
          listMember: sinon.stub().rejects(Error('generic error'))
        }
      })

      const req = {
        params: {
          id: 1
        }
      }

      const res = {
        status: (code) => {
          code.should.be.equal(500)
        },
        send: (error) => {
          error.should.be.equal('generic error')
          done()
        }
      }

      route.listMember(req, res)
    })
  })
})
