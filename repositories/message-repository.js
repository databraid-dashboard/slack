const knex = require('../knex.js');
const { camelizeKeys } = require('humps');

function getMessages() {
  return knex('messages').orderBy('message_id').then(result => camelizeKeys(result));
}

function getMessagesByChannelName(channelName) {
  const subquery = knex('channels').select('channel_id').where('channel_name', channelName);

  return knex('messages').where('channel_id', 'in', subquery).then(result => camelizeKeys(result));
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
