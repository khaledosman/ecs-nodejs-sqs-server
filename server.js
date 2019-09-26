'use strict'
const express = require('express')
require('dotenv').config()
const AWS = require('aws-sdk')
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
})
const sqs = new AWS.SQS()

const params = {
  MessageBody: 'Hello From Data Importer',
  // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
  // MessageId: "Group1",  // Required for FIFO queues
  QueueUrl: process.env.SQS_QUEUE_URL // process.env.AWS_STAGE === 'dev' ? process.env.SQS_QUEUE_URL_DEV : process.env.SQS_QUEUE_URL_LIVE
}

// Constants
const PORT = process.env.PORT || 8080

// App
const app = express()
app.get('/', (req, res) => {
  res.send('Hello world\n')
})

app.listen(PORT, () => {
  console.log(`Running on http://${process.env.HOST}:${process.env.PORT}`)
  sqs.sendMessage(params)
    .promise()
    .then((wat) => {
      console.log(wat)
    }).catch(err => {
      console.error(err)
    })
})
