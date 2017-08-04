exports.seed = knex => knex('message').del()
  .then(() => knex('message').insert([
    {
      id: 1,
      user_map_id: '111AGJG876',
      channel_map_id: 'CCCC1111',
      message_timestamp: new Date(1501624043.643661 * 1000),
      message: 'This is a message. This is what I would send over slack in this channel.',
    },
    {
      id: 2,
      user_map_id: '333HHD87HG',
      channel_map_id: 'CCCC1111',
      message_timestamp: new Date(1501625043.643661 * 1000),
      message: 'This is a great new message. This is different than the last message.',
    },
    {
      id: 3,
      user_map_id: '111AGJG876',
      channel_map_id: 'CCCC1111',
      message_timestamp: new Date(1501626043.643661 * 1000),
      message: 'Happy things! Look at this message. It is sooooo cool.',
    },
    {
      id: 4,
      user_map_id: '22298H7GG',
      channel_map_id: 'CCCC2222',
      message_timestamp: new Date(1501627043.643661 * 1000),
      message: 'I am trying to make a decent amount of messages.',
    },
    {
      id: 5,
      user_map_id: '111AGJG876',
      channel_map_id: 'CCCC2222',
      message_timestamp: new Date(1501628043.643661 * 1000),
      message: 'This is the last message I will add.',
    },
  ]))
  .then(function(){
        return knex.raw(`SELECT setval('message_id_seq', (SELECT MAX(id) FROM message))`)
  });

