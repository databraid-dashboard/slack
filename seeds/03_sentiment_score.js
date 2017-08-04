exports.seed = knex => knex('sentiment_score').del()
  .then(() => knex('sentiment_score').insert([
    {
      id: 1,
      channel_map_id: 'CCCC1111',
      score: 0.50,
      magnitude: 30,
      number_of_messages: 100,
      created_at: new Date('2017-07-31 14:26:16 UTC'),
      updated_at: new Date('2017-07-31 14:26:16 UTC'),
    },
    {
      id: 2,
      channel_map_id: 'CCCC1111',
      score: -0.50,
      magnitude: 32,
      number_of_messages: 100,
      created_at: new Date('2017-07-31 14:26:16 UTC'),
      updated_at: new Date('2017-07-31 14:26:16 UTC'),
    },
    {
      id: 3,
      channel_map_id: 'CCCC2222',
      score: 0.02,
      magnitude: 15,
      number_of_messages: 100,
      created_at: new Date('2017-07-31 14:26:16 UTC'),
      updated_at: new Date('2017-07-31 14:26:16 UTC'),
    },
  ]));
