const knex = require('../knex');

function fetchMessageBatch(channelId) {
  return knex('message')
    .innerJoin('channel_map', 'message.channel_map_id', 'channel_map.id')
    .where('channel_map.id', channelId)
    .select('message')
    .orderBy('message.id', 'desc')
    .limit(100);
}

function addSentimentScore(sentimentScore, magnitudeScore, channelId, numberOfMessages) {
  return knex('sentiment_score')
    .insert({
      channel_map_id: channelId,
      score: sentimentScore,
      magnitude: magnitudeScore,
      number_of_messages: numberOfMessages,
    }, '*');
}

module.exports = { fetchMessageBatch, addSentimentScore };
