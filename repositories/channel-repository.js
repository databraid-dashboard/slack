const knex = require('../knex.js');
const { camelizeKeys } = require('humps');

function getChannels() {
<<<<<<< HEAD
  return knex('channel_map').orderBy('channel_name').then(result => camelizeKeys(result));
=======
  return knex('channels')
    .orderBy('channel_name')
    .then(result => camelizeKeys(result));
>>>>>>> 815ae2e3d59358689b98a530bcb16491d21cf66d
}

function getChannelById(id) {
  return knex('channel_map').where('id', id).first().then(result => camelizeKeys(result));
}

module.exports = { getChannels, getChannelById };
