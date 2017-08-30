const knex = require('../knex.js');
const { camelizeKeys } = require('humps');

function getMessages() {
  return knex('message').orderBy('channel_map_id').then(result => camelizeKeys(result));
}

function getMessagesByChannelName(channelName) {
  /*
  Need the 'message' data for messages whose 'channel_map_id' corresponds
  to the 'id' of the 'channel_map' with 'channel_name' matching the passed in channelName.
  */

  const subquery = knex('channel_map').select('id').where('channel_name', channelName);

  return knex('message')
    .where('channel_map_id', 'in', subquery)
    .then(result => camelizeKeys(result));
}

module.exports = { getMessages, getMessagesByChannelName };
