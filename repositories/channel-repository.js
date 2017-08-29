const knex = require('../knex.js');
const { camelizeKeys } = require('humps');

function getChannels() {
  return knex('channel_map').orderBy('channel_name').then((rows) => {
    const channels = camelizeKeys(rows);

    return channels;
  });
}

function getChannelById(id) {
  return knex('channel_map').where('id', id).first().then((row) => {
    if (!row) {
      throw new Error(404, 'Not Found');
    }

    const channel = camelizeKeys(row);

    return channel;
  });
}

module.exports = { getChannels, getChannelById };
