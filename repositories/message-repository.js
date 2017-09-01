const knex = require('../knex.js');
const { camelizeKeys } = require('humps');

function getMessages() {
  return knex('messages').orderBy('message_id').then(result => camelizeKeys(result));
}

function getMessagesByChannelName(channelName) {
  const subquery = knex('channels').select('channel_id').where('channel_name', channelName);

  return knex('messages').where('channel_id', 'in', subquery).then(result => camelizeKeys(result));
}

module.exports = { getMessages, getMessagesByChannelName };
