FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm ci --only=production

# Bundle app source
COPY . .

ARG AWS_STAGE=dev
ARG SQS_QUEUE_URL=https://sqs.eu-central-1.amazonaws.com/920046484061/ovs-queue-dev 
ENV AWS_STAGE=$AWS_STAGE 
ENV SQS_QUEUE_URL=$SQS_QUEUE_URL

EXPOSE 8080

CMD [ "node", "server.js" ]