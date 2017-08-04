exports.seed = knex => knex('channel_map').del()
  .then(() => knex('channel_map').insert([
    {
      id: 1,
      channel_id: 'CCCC1111',
      channel_name: '#channel',
    },
    {
      id: 2,
      channel_id: 'CCCC2222',
      channel_name: '#other_channel',
    },
  ]));
