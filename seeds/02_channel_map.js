exports.seed = knex =>
  knex('channel_map')
    .del()
    .then(() =>
      knex('channel_map').insert([
        {
          id: 1,
          channel_id: 'C6DUVSW3A',
          channel_name: '#dev',
        },
        {
          id: 2,
          channel_id: 'C6E2XMK4H',
          channel_name: '#general',
        },
        {
          id: 3,
          channel_id: 'l847630912p',
          channel_name: '#random',
        },
        {
          id: 4,
          channel_id: 'z63492017x',
          channel_name: '#other_channel',
        },
      ]),
    )
    .then(() => knex.raw("SELECT setval('channel_map_id_seq', (SELECT MAX(id) FROM channel_map))"));
