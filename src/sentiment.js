const express = require('express');
const { camelizeKeys } = require('humps');
const Language = require('@google-cloud/language');

const router = express.Router();
const language = Language();

const { fetchMessageBatch, addSentimentScore } = require('../repositories/sentiment-repository');

function analyzeSentimentOfText(messageString, channelId, numberOfMessages) {
  const document = {
    content: messageString,
    type: 'PLAIN_TEXT',
  };

  return language.analyzeSentiment({ document })
    .then((results) => {
      const sentimentScore = results[0].documentSentiment.score;
      const magnitudeScore = results[0].documentSentiment.magnitude;
      return addSentimentScore(
        sentimentScore,
        magnitudeScore,
        channelId,
        numberOfMessages,
      );
    })
    .then((results) => {
      const newScoreData = camelizeKeys(results[0]);
      return newScoreData;
    })
    .catch(err => err);
}

function analyzeSentimentAndSaveScore(channelId) {
  fetchMessageBatch(channelId)
    .then((messages) => {
      const messagesArray = messages.map(msgObject => msgObject.message);
      const numberOfMessages = messagesArray.length;
      const messageString = messagesArray.join('\n');
      analyzeSentimentOfText(messageString, channelId, numberOfMessages);
    })
    .catch(err => err);
}

analyzeSentimentAndSaveScore(1);

module.exports = router;
