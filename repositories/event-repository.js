const knex = require('../knex.js');

function writeMessage(userId, text, rawTS, channelId) {
  if (userId && text && rawTS && channelId) {
<<<<<<< HEAD
    return knex('message').insert(
      {
        user_map_id: knex.raw(`(select id from user_map where user_id = '${userId}')`),
        channel_map_id: knex.raw(`(select id from channel_map where channel_id = '${channelId}')`),
=======
    return knex('messages')
      .insert({
        user_id: userId,
        channel_id: channelId,
>>>>>>> 815ae2e3d59358689b98a530bcb16491d21cf66d
        raw_ts: rawTS,
        message_timestamp: new Date(Number.parseFloat(rawTS) * 1000),
        message: text,
      },
      '*',
    );
  }
  return [];
}

module.exports = { writeMessage };
