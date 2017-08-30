const knex = require('../knex.js');
const { camelizeKeys } = require('humps');

function getChannels() {
  return knex('channels').orderBy('channel_name').then((rows) => {
    const channels = camelizeKeys(rows);

    return channels;
  });
}

function getChannelById(id) {
  return knex('channels').where('id', id).first().then((row) => {
    const channel = camelizeKeys(row);

    return channel;
  });
}

module.exports = { getChannels, getChannelById };
