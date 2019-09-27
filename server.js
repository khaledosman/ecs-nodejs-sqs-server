'use strict'
const express = require('express')
require('dotenv').config()
const { sendMessageToSQS } = require('./helpers/sqs-helpers')

// Constants
const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || 'localhost'

// The signals we want to handle
// NOTE: although it is tempting, the SIGKILL signal (9) cannot be intercepted and handled
const signals = {
  SIGHUP: 1,
  SIGINT: 2,
  SIGTERM: 15
}
// App
const app = express()
app.get('/', (req, res) => {
  res.send('Hello world\n')
})

const server = app.listen(PORT, () => {
  console.log(`Running on http://${HOST}:${PORT}`)
  sendMessageToSQS('Hello From Data Importer')
    .then((wat) => {
      console.log(wat)
    }).catch(err => {
      console.error(err)
    })
})

// Do any necessary shutdown logic for our application here
const shutdown = (signal, value) => {
  console.log('shutdown!')
  server.close(() => {
    console.log(`server stopped by ${signal} with value ${value}`)
    process.exit(128 + value)
  })
}

// Create a listener for each of the signals that we want to handle
Object.keys(signals).forEach((signal) => {
  process.on(signal, () => {
    console.log(`process received a ${signal} signal`)
    shutdown(signal, signals[signal])
  })
})
