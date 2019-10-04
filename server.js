'use strict'
const express = require('express')
require('dotenv').config()
const { publish } = require('./helpers/pubnub')
const { handleGracefulShutdown } = require('./helpers/graceful-shutdown')

// Constants
const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || 'localhost'

// App
const app = express()
app.get('/', (req, res) => {
  res.send('Hello world\n')
})

const server = app.listen(PORT, () => {
  console.log(`Running on http://${HOST}:${PORT}`)
  publish('hello_channel', 'hello_world').then(console.log).catch(console.log)
})

handleGracefulShutdown(server)
