const express = require('express');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

class SentimentRepository {

  fetchMessageBatch(channelId) {
    return knex('message')
      .innerJoin('channel_map', 'message.channel_map_id', 'channel_map.id')
      .where('channel_map.id', channelId)
      .select('message')
      .orderBy('message.id', 'desc')
      .limit(100)
  }

  addSentimentScore(sentimentScore, magnitudeScore, channelId, numberOfMessages) {
    return knex('sentiment_score')
      .insert({
        channel_map_id: channelId,
        score: sentimentScore,
        magnitude: magnitudeScore,
        number_of_messages: numberOfMessages
      }, '*')
  }

}

module.exports = SentimentRepository;
