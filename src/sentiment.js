if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable global-require */
  require('dotenv').config();
}

const Language = require('@google-cloud/language');
const { fetchMessageBatch, addSentimentScore } = require('../repositories/sentiment-repository');

const language = Language();

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
    .then(scoreData => scoreData[0].score)
    .catch(err => err);
}

function analyzeSentimentAndSaveScore(channelId) {
  // const channelId = channelId;
  // const numberOfMessages;

  fetchMessageBatch(channelId)
    .then((messages) => {
      const messagesArray = messages.map(msgObject => msgObject.message);
      const messageString = messagesArray.join('\n');
      const numberOfMessages = messagesArray.length;
      analyzeSentimentOfText(messageString, channelId, numberOfMessages);
    })
    .catch(err => err);
}

module.exports = { analyzeSentimentAndSaveScore, analyzeSentimentOfText };
