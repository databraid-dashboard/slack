const knex = require('../knex.js');
const { camelizeKeys } = require('humps');

function getChannels() {
  return knex('channels').orderBy('channel_name').then(result => camelizeKeys(result));
}

function getChannelById(id) {
  return knex('channels').where('channel_id', id).first().then(result => camelizeKeys(result));
}

module.exports = { getChannels, getChannelById };
