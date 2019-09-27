'use strict'
const express = require('express')
require('dotenv').config()
const SQS = require('aws-sdk/clients/sqs')

const sqs = new SQS({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
})

const params = {
  MessageBody: 'Hello From Data Importer',
  QueueUrl: process.env.SQS_QUEUE_URL // process.env.AWS_STAGE === 'dev' ? process.env.SQS_QUEUE_URL_DEV : process.env.SQS_QUEUE_URL_LIVE
}

// Constants
const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || 'localhost'

// App
const app = express()
app.get('/', (req, res) => {
  res.send('Hello world\n')
})

app.listen(PORT, () => {
  console.log(`Running on http://${HOST}:${PORT}`)
  sqs.sendMessage(params)
    .promise()
    .then((wat) => {
      console.log(wat)
    }).catch(err => {
      console.error(err)
    })
})
