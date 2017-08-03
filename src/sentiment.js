const express = require('express');
const { camelizeKeys, decamelizeKeys } = require('humps');
const rp = require('request-promise');

const router = express.Router();

const SentimentRepository = require('../repositories/sentiment-repository');
const sentimentRepo = new SentimentRepository();

// router.get('/', (req, res) => {
//    sentimentRepo.fetchMessageBatch(847630912).then((messages) => {
//      res.send(camelizeKeys(messages));
//     })
//     .catch(err =>
//       res.status(500).send(err));
//   });


sentimentRepo.fetchMessageBatch(channelId)
  .then(messages => {
    let messagesArray = messages.map(msgObject => msgObject.message);
    let numberOfMessages = messagesArray.length;
    let messageString = messagesArray.join('\n');
    analyzeSentimentOfText(messageString, numberOfMessages);
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });


function analyzeSentimentOfText (messageString, numberOfMessages) {
  const Language = require('@google-cloud/language');
  const language = Language();

  const document = {
    'content': messageString,
    'type': 'PLAIN_TEXT'
  };

  return language.analyzeSentiment({ document: document })
    .then((results) => {
      fetchChannelId();

      const sentimentScore = results[0].documentSentiment.score;
      const magnitudeScore = results[0].documentSentiment.magnitude;
      sentimentRepo.addSentimentScore(sentimentScore, magnitudeScore, numberOfMessages);
//
//       // const sentiment = results[0].documentSentiment;
//       // console.log(`Document sentiment:`);
//       // console.log(`  Score: ${sentiment.score}`);
//       // console.log(`  Magnitude: ${sentiment.magnitude}`);
//       //
//       // const sentences = results[0].sentences;
//       // sentences.forEach((sentence) => {
//       //   console.log(`Sentence: ${sentence.text.content}`);
//       //   console.log(`  Score: ${sentence.sentiment.score}`);
//       //   console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
//       // });
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
}

fetchChannelId();

module.exports = router;
