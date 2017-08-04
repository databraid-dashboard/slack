if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable global-require */
  require('dotenv').config();
}

const Language = require('@google-cloud/language');
const { fetchMessageBatch, addSentimentScore } = require('../repositories/sentiment-repository');

const language = Language();

export default function analyzeSentimentAndSaveScore(io, channelId) {
  let numberOfMessages;

  fetchMessageBatch(channelId)
    .then((messages) => {
      const messagesArray = messages.map(msgObject => msgObject.message);
      const messageString = messagesArray.join('\n');
      numberOfMessages = messagesArray.length;
      return messageString;
    })
    .then((messageString) => {
      const document = {
        content: messageString,
        type: 'PLAIN_TEXT',
      };
      return language.analyzeSentiment({ document });
    })
    .then((analysisResults) => {
      const sentimentScore = analysisResults[0].documentSentiment.score;
      const magnitudeScore = analysisResults[0].documentSentiment.magnitude;
      return addSentimentScore(
        sentimentScore,
        magnitudeScore,
        channelId,
        numberOfMessages,
      );
    })
    .then(scoreData => console.log(scoreData[0].score))
    .catch(err => err);
}
