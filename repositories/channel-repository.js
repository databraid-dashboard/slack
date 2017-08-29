const knex = require('../knex.js');
const { camelizeKeys, decamelizeKeys } = require('humps');

function getChannels() {
  return knex('channel_map')
    .orderBy('channel_name')
    .then((rows) => {
      const channels = camelizeKeys(rows);

      return channels;
    })
    .catch((err) => {
      next(err);
    });
}

function getChannelById(id) {
  return knex('channel_map')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        console.error(404, 'Not Found');
      }

      const channel = camelizeKeys(row);

      return channel;
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getChannels, getChannelById };
