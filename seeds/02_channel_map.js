'use strict';

exports.seed = function(knex) {
  return knex('channel_map').del()
    .then(function () {
      return knex('channel_map').insert([
        {
          'id': 1,
          'channel_id': 847630912,
          'channel_name': '#channel'
        },
        {
          'id': 2,
          'channel_id': 63492017,
          'channel_name': '#other_channel'
        },
      ]);
    });
};
