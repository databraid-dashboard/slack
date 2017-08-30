const knex = require('../knex.js');
const { camelizeKeys } = require('humps');

function getMessages() {
  return knex('messages').orderBy('channel_id').then((rows) => {
    const messages = camelizeKeys(rows);

    return messages;
  });
}

function getMessagesByChannelName(channelName) {
  const subquery = knex('channels').select('channel_id').where('channel_name', channelName);

  return knex('messages').where('channel_id', 'in', subquery).then((row) => {
    const messages = camelizeKeys(row);

    return messages;
  });
}

module.exports = { getMessages, getMessagesByChannelName };
