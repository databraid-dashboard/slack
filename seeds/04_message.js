exports.seed = function (knex) {
  return knex('message').del()
    .then(() => knex('message').insert([
      {
        id: 1,
        user_map_id: 1,
        channel_map_id: 1,
        message_id: 1003,
        message: 'This is a message. This is what I would send over slack in this channel.',
        created_at: new Date('2017-07-31 14:26:16 UTC'),
        updated_at: new Date('2017-07-31 14:26:16 UTC'),
      },
      {
        id: 2,
        user_map_id: 3,
        channel_map_id: 1,
        message_id: 1004,
        message: 'This is another message. This is different than the last message.',
        created_at: new Date('2017-07-31 14:26:16 UTC'),
        updated_at: new Date('2017-07-31 14:26:16 UTC'),
      },
      {
        id: 3,
        user_map_id: 1,
        channel_map_id: 1,
        message_id: 1005,
        message: 'blahhhh blah blah. Look at this message. It is sooooo cool.',
        created_at: new Date('2017-07-31 14:26:16 UTC'),
        updated_at: new Date('2017-07-31 14:26:16 UTC'),
      },
      {
        id: 4,
        user_map_id: 2,
        channel_map_id: 2,
        message_id: 1006,
        message: 'I am trying to make a decent amount of messages.',
        created_at: new Date('2017-07-31 14:26:16 UTC'),
        updated_at: new Date('2017-07-31 14:26:16 UTC'),
      },
      {
        id: 5,
        user_map_id: 1,
        channel_map_id: 2,
        message_id: 1003,
        message: 'This is the last message I will add.',
        created_at: new Date('2017-07-31 14:26:16 UTC'),
        updated_at: new Date('2017-07-31 14:26:16 UTC'),
      },
    ]));
};
