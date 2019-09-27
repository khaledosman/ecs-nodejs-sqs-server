const SQS = require('aws-sdk/clients/sqs')

const sqs = new SQS({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
})

function sendMessageToSQS (message) {
  const params = {
    MessageBody: message,
    QueueUrl: process.env.SQS_QUEUE_URL // process.env.AWS_STAGE === 'dev' ? process.env.SQS_QUEUE_URL_DEV : process.env.SQS_QUEUE_URL_LIVE
  }

  return sqs.sendMessage(params)
    .promise()
}

module.exports = { sendMessageToSQS }
