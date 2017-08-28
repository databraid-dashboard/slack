const knex = require('../knex.js');
const { camelizeKeys } = require('humps');

function getChannels() {
  return knex('channel_map')
    .orderBy('channel_name')
    .then(result => camelizeKeys(result));
}

module.exports = { getChannels };
