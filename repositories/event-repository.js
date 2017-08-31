const knex = require('../knex.js');

function writeMessage(userId, text, rawTS, channelId) {
  if (userId && text && rawTS && channelId) {
    return knex('messages').insert(
      {
        user_id: userId,
        channel_id: channelId,
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
