const knex = require('../knex.js');
const { camelizeKeys, decamelizeKeys } = require('humps');

function getMessages() {
  return knex('message')
    .orderBy('channel_map_id')
    .then((rows) => {
      const messages = camelizeKeys(rows);

      return messages;
    })
    .catch((err) => {
      next(err);
    });
}

function getMessagesByChannelName(channelName) {
  /*
  Need the 'message' data for messages whose 'channel_map_id' corresponds to the 'id' of the 'channel_map' with 'channel_name' matching the passed in channelName.
  */

  const subquery = knex('channel_map').select('id').where('channel_name', channelName);

  return knex('message')
    .where('channel_map_id', 'in', subquery)
    .then((row) => {
      if (!row) {
        console.error(404, 'Not Found');
      }

      const messages = camelizeKeys(row);

      return messages;
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getMessages, getMessagesByChannelName };
