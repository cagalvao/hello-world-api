'use strict'
const express = require('express')
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const httpServer = require('http').Server(app)

const openHttpConnections = {}

const port = 5000

attatchCORSRules()
attachErrorHandlers()
attachHttpServer()
attachRouters()

app.get('/', function (req, res) {
  res.send('The Hello World API lives!')
})

function attachRouters () {
  app.use(require('./membership_route').getRouter())
}

function attatchCORSRules () {
  app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')

    const allowedHeaders = 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Pragma, Expires, login, registration, Authorization, X-Session-Id'
    const exposedHeaders = 'Content-Disposition, Filename, X-Soft-Token'

    res.header('Access-Control-Allow-Headers', allowedHeaders)
    res.header('Access-Control-Expose-Headers', exposedHeaders)

    next()
  })
}

function attachErrorHandlers () {
  process.on('uncaughtException', function (err) {
    console.log('Uncaught exception ', err)

    shutdown()
  })

  process.on('SIGTERM', function () {
    console.log('Received SIGTERM')

    shutdown()
  })

  process.on('SIGINT', function () {
    console.log('Received SIGINT')

    shutdown()
  })
}

function attachHttpServer () {
  httpServer.on('connection', function (conn) {
    const key = conn.remoteAddress + ':' + (conn.remotePort || '')

    openHttpConnections[key] = conn

    conn.on('close', function () {
      delete openHttpConnections[key]
    })
  })

  try {
    httpServer.listen(port, function () {
      console.log('Webserver listening on localhost:' + port)
    })
  } catch (err) {
    console.log('Error occurred creating database connection pool', err)
    console.log('Exiting process')
    process.exit(1)
  }
}

function shutdown () {
  console.log('Shutting down')
  console.log('Closing web server')

  httpServer.close(function () {
    console.log('Web server closed')

    process.exit(1)
  })
}
