exports.seed = knex => knex('channel_map').del()
  .then(() => knex('channel_map').insert([
    {
      id: 1,
      channel_id: 847630912,
      channel_name: '#channel',
    },
    {
      id: 2,
      channel_id: 63492017,
      channel_name: '#other_channel',
    },
  ]))
  .then(function(){
    return knex.raw(`SELECT setval('channel_map_id_seq', (SELECT MAX(id) FROM channel_map))`)
  });
