
const PubNub = require('pubnub')

const pubnub = new PubNub({
  publishKey: process.env.PUBNUB_PUBLISH_KEY,
  subscribeKey: process.env.PUBNUB_SUBSCRIBE_KEY
})

pubnub.subscribe({
  channels: ['hello_channel']
})
pubnub.addListener({
  message: function (m) {
    // handle message
    // const channelName = m.channel // The channel for which the message belongs
    // const channelGroup = m.subscription // The channel group or wildcard subscription match (if exists)
    // const pubTT = m.timetoken // Publish timetoken
    // const msg = m.message // The Payload
    // const publisher = m.publisher // The Publisher
    console.log('message', m)
  },
  presence: function (p) {
    // handle presence
    // const action = p.action // Can be join, leave, state-change or timeout
    // const channelName = p.channel // The channel for which the message belongs
    // const occupancy = p.occupancy // No. of users connected with the channel
    // const state = p.state // User State
    // const channelGroup = p.subscription //  The channel group or wildcard subscription match (if exists)
    // const publishTime = p.timestamp // Publish timetoken
    // const timetoken = p.timetoken // Current timetoken
    // const uuid = p.uuid // UUIDs of users who are connected with the channel
    console.log('presence', p)
  },
  signal: function (signalMessage) {
    // Handle signal message
    console.log('signal', signalMessage)
  },
  user: function (userEvent) {
    // for Objects, this will trigger when:
    // . user updated
    // . user deleted
    console.log({ userEvent })
  },
  space: function (spaceEvent) {
    // for Objects, this will trigger when:
    // . space updated
    // . space deleted
    console.log({ spaceEvent })
  },
  membership: function (membershipEvent) {
    // for Objects, this will trigger when:
    // . user added to a space
    // . user removed from a space
    // . membership updated on a space
    console.log({ membershipEvent })
  },
  status: function (s) {
    // const affectedChannelGroups = s.affectedChannelGroups // The channel groups affected in the operation, of type array.
    // const affectedChannels = s.affectedChannels // The channels affected in the operation, of type array.
    // const category = s.category // Returns PNConnectedCategory
    // const operation = s.operation // Returns PNSubscribeOperation
    // const lastTimetoken = s.lastTimetoken // The last timetoken used in the subscribe request, of type long.
    // const currentTimetoken = s.currentTimetoken // The current timetoken fetched in the subscribe response, which is going to be used in the next request, of type long.
    // const subscribedChannels = s.subscribedChannels // All the current subscribed channels, of type array.
    console.log({ statusEvent: s })
  }
})

function publish (channel, message) {
  return new Promise((resolve, reject) => {
    pubnub.signal({
      message: { message },
      channel: channel
    }, function (status, response) {
      if (status.error) {
        reject(new Error(status.message))
      } else {
        resolve({ status, response })
      }
    })
  })
};

module.exports = { publish }
