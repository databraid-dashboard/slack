const knex = require('../knex.js');
const { camelizeKeys } = require('humps');

function getMessages() {
  return knex('messages')
    .orderBy('message_id')
    .then(result => camelizeKeys(result));
}

function getMessagesByChannelName(channelName) {
  return knex('messages')
    .innerJoin('channels', 'messages.channel_id', 'channels.channel_id')
    .innerJoin('users', 'messages.user_id', 'users.user_id')
    .where('channel_name', channelName)
    .then(row => camelizeKeys(row))
    .catch(err => err);
}

module.exports = { getMessages, getMessagesByChannelName };
