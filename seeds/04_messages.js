<<<<<<< HEAD:seeds/04_message.js
exports.seed = knex =>
  knex('message')
    .del()
    .then(() =>
      knex('message').insert([
        {
          id: 1,
          user_map_id: 1,
          channel_map_id: 1,
          raw_ts: Number.parseFloat(1501624043.643661),
          message_timestamp: new Date(1501624043.643661 * 1000),
          message: 'This is a message. This is what I would send over slack in this channel.',
        },
        {
          id: 2,
          user_map_id: 3,
          channel_map_id: 1,
          raw_ts: '1501625043.643661',
          message_timestamp: new Date(1501625043.643661 * 1000),
          message: 'This is a great new message. This is different than the last message.',
        },
        {
          id: 3,
          user_map_id: 1,
          channel_map_id: 1,
          raw_ts: '1501626043.643661',
          message_timestamp: new Date(1501626043.643661 * 1000),
          message: 'Happy things! Look at this message. It is sooooo cool.',
        },
        {
          id: 4,
          user_map_id: 2,
          channel_map_id: 2,
          raw_ts: '1501627043.643661',
          message_timestamp: new Date(1501627043.643661 * 1000),
          message: 'I am trying to make a decent amount of messages.',
        },
        {
          id: 5,
          user_map_id: 1,
          channel_map_id: 2,
          raw_ts: '1501628043.643661',
          message_timestamp: new Date(1501628043.643661 * 1000),
          message: 'This is the last message I will add.',
        },
      ]),
    )
    .then(() => knex.raw("SELECT setval('message_id_seq', (SELECT MAX(id) FROM message))"));
=======
exports.seed = knex => knex('messages').del()
  .then(() => knex('messages').insert([
    {
      message_id: 1,
      user_id: 'U6FMJ3J3Z',
      channel_id: 'C6E2XMLAV',
      raw_ts: '1501624043.643661',
      message_timestamp: new Date(1501624043.643661 * 1000),
      message: 'This is a message. This is what I would send over slack in this channel.',
    },
    {
      message_id: 2,
      user_id: 'U6KESJ1BN',
      channel_id: 'C6E2XMLAV',
      raw_ts: '1501625043.643661',
      message_timestamp: new Date(1501625043.643661 * 1000),
      message: 'This is a great new message. This is different than the last message.',
    },
    {
      message_id: 3,
      user_id: 'U6T3VM814',
      channel_id: 'C6DUVSW3A',
      raw_ts: '1501626043.643661',
      message_timestamp: new Date(1501626043.643661 * 1000),
      message: 'Happy things! Look at this message. It is sooooo cool.',
    },
    {
      message_id: 4,
      user_id: 'U6SPRFYLX',
      channel_id: 'C6E2XMK4H',
      raw_ts: '1501627043.643661',
      message_timestamp: new Date(1501627043.643661 * 1000),
      message: 'I am trying to make a decent amount of messages.',
    },
    {
      message_id: 5,
      user_id: 'U6SHV2R5L',
      channel_id: 'C6E2XMK4H',
      raw_ts: '1501628043.643661',
      message_timestamp: new Date(1501628043.643661 * 1000),
      message: 'This is the last message I will add.',
    },
  ]))
  .then(() => knex.raw('SELECT setval(\'messages_message_id_seq\', (SELECT MAX(message_id) FROM messages))'));
>>>>>>> 815ae2e3d59358689b98a530bcb16491d21cf66d:seeds/04_messages.js
