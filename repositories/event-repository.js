const knex = require('../knex.js');

function writeMessage(userId, text, rawTS, channelId) {
  if (userId && text && rawTS && channelId) {
    return knex('message').insert(
      {
        user_map_id: knex.raw(`(select id from user_map where user_id = '${userId}')`),
        channel_map_id: knex.raw(`(select id from channel_map where channel_id = '${channelId}')`),
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
