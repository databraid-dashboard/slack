exports.seed = knex => knex('channel_map').del()
  .then(() => knex('channel_map').insert([
    {
      id: 1,
      channel_id: 'C1111111',
      channel_name: '#channel',
    },
    {
      id: 2,
      channel_id: 'C2222222',
      channel_name: '#other_channel',
    },
    {
      id: 3,
      channel_id: 'C6DUVSW3A',
      channel_name: '#dev',
    },
  ]))
  .then(function(){
        return knex.raw(`SELECT setval('channel_map_id_seq', (SELECT MAX(id) FROM channel_map))`)
  });
