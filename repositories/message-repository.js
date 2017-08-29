const knex = require('../knex.js');
const { camelizeKeys } = require('humps');

function getMessages() {
  return knex('message').orderBy('channel_map_id').then((rows) => {
    const messages = camelizeKeys(rows);

    return messages;
  });
}

function getMessagesByChannelName(channelName) {
  /*
  Need the 'message' data for messages whose 'channel_map_id' corresponds
  to the 'id' of the 'channel_map' with 'channel_name' matching the passed in channelName.
  */

  const subquery = knex('channel_map').select('id').where('channel_name', channelName);

  return knex('message').where('channel_map_id', 'in', subquery).then((row) => {
    if (!row) {
      throw new Error(404, 'Not Found');
    }

    const messages = camelizeKeys(row);

    return messages;
  });
}

module.exports = { getMessages, getMessagesByChannelName };
