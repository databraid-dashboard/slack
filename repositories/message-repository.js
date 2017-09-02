const knex = require('../knex.js');
const { camelizeKeys } = require('humps');

function getMessages() {
  return knex('messages')
    .orderBy('message_id')
    .then(result => camelizeKeys(result));
}

function getMessagesByChannelName(channelName) {
  return knex('messages')
    .select('message_id',
      'user_id',
      'messages.channel_id',
      'raw_ts',
      'message_timestamp',
      'message')
    .innerJoin('channels', 'channels.channel_id', 'messages.channel_id')
    .where('channel_name', channelName)
    .then(result => camelizeKeys(result))
    .catch(e => e);
}

function updateMessage(channelId, message) {
  return knex('messages')
    .where({ channel_id: channelId, raw_ts: message.ts })
    .update({ message: message.text })
    .catch(e => e);
}

function deleteMessage(channelId, timestamp) {
  return knex('messages')
    .where({ channel_id: channelId, raw_ts: timestamp })
    .del()
    .catch(e => e);
}

module.exports = { getMessages,
  getMessagesByChannelName,
  updateMessage,
  deleteMessage };
