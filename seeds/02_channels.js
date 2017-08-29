exports.seed = knex => knex('channels').del()
  .then(() => knex('channels').insert([
    {
      channel_id: 'l847630912p',
      channel_name: 'channel',
    },
    {
      channel_id: 'C6DUVSW3A',
      channel_name: 'dev',
    },
    {
      channel_id: 'C6E2XMK4H',
      channel_name: 'general',
    },
  ]));
