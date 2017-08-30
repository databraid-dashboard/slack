exports.seed = knex => knex('messages').del()
  .then(() => knex('messages').insert([
    {
      message_id: 1,
      user_id: 'U6FMJ3J3Z',
      channel_id: 'l847630912p',
      raw_ts: '1501624043.643661',
      message_timestamp: new Date(1501624043.643661 * 1000),
      message: 'This is a message. This is what I would send over slack in this channel.',
    },
    {
      message_id: 2,
      user_id: 'U6KESJ1BN',
      channel_id: 'l847630912p',
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
