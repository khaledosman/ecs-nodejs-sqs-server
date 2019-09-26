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
  MessageBody: 'Information about current NY Times fiction bestseller for week of 12/11/2016.',
  // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
  // MessageId: "Group1",  // Required for FIFO queues
  QueueUrl: process.env.SQS_QUEUE_URL
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