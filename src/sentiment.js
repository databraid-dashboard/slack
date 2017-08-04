if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable global-require */
  require('dotenv').config();
}

const { camelizeKeys } = require('humps');
const Language = require('@google-cloud/language');
const { fetchMessageBatch, addSentimentScore } = require('../repositories/sentiment-repository');

const language = Language();


function analyzeSentimentOfText(messageString, channelId, numberOfMessages) {
  const document = {
    content: messageString,
    type: 'PLAIN_TEXT',
  };

  return language.analyzeSentiment({ document })
    .then(results => {
      const sentimentScore = results[0].documentSentiment.score;
      const magnitudeScore = results[0].documentSentiment.magnitude;
      return addSentimentScore(
        sentimentScore,
        magnitudeScore,
        channelId,
        numberOfMessages,
      );
    })
    .then(scoreData => {
      return scoreData[0].score;
    })
    .catch(err => err);
}

function analyzeSentimentAndSaveScore(channelId) {
  fetchMessageBatch(channelId)
    .then(messages => {
      console.log('made it here');
      const messagesArray = messages.map(msgObject => msgObject.message);
      const numberOfMessages = messagesArray.length;
      const messageString = messagesArray.join('\n');
      analyzeSentimentOfText(messageString, channelId, numberOfMessages);
    })
    .catch(err => err);
}

analyzeSentimentAndSaveScore(1);

module.exports = { analyzeSentimentAndSaveScore, analyzeSentimentOfText };
