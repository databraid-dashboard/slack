const knex = require('../knex');

function fetchMessageBatch(channelId) {
  return knex('messages')
    .innerJoin('channels', 'messages.channel_id', 'channels.channel_id')
    .where('channels.channel_id', channelId)
    .select('messages')
    .orderBy('messages.message_id', 'desc')
    .limit(100);
}

function addSentimentScore(sentimentScore, magnitudeScore, channelId, numberOfMessages) {
  return knex('sentiment_scores')
    .insert({
      channel_id: channelId,
      score: sentimentScore,
      magnitude: magnitudeScore,
      number_of_messages: numberOfMessages,
    }, '*');
}

module.exports = { fetchMessageBatch, addSentimentScore };
