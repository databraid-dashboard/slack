const knex = require('../knex.js');
const { camelizeKeys } = require('humps');

function getChannels() {
  return knex('channel_map').orderBy('channel_name').then(result => camelizeKeys(result));
}

function getChannelById(id) {
  return knex('channel_map').where('id', id).first().then(result => camelizeKeys(result));
}

module.exports = { getChannels, getChannelById };
