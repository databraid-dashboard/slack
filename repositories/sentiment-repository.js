const express = require('express');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

class SentimentRepository {

  fetchMessageBatch(channelId) {
    return knex('message')
      .innerJoin('channel_map', 'message.channel_map_id', 'channel_map.id')
      .where('channel_map.channel_id', channelId)
      .select('channel_map.channel_id', 'message')
      .orderBy('message.id', 'desc')
      .limit(100)
  }

  // addSentimentScore(sentimentScore, magnitudeScore) {
  //   return knex('sentiment_score')
  //     .insert({
  //       channel_map_id:
  //       score: sentimentScore,
  //       magnitude: magnitudeScore,
  //       number_of_messages:
  //     })
  // }

}

module.exports = SentimentRepository;
