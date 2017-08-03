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

function fetchMessagesAndAnalyzeSentiment(channelId) {
  sentimentRepo.fetchMessageBatch(channelId)
    .then(messages => {
      let messagesArray = messages.map(msgObject => msgObject.message);
      let numberOfMessages = messagesArray.length;
      let messageString = messagesArray.join('\n');
      analyzeSentimentOfText(messageString, channelId, numberOfMessages);
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
}


function analyzeSentimentOfText (messageString, channelId, numberOfMessages) {
  const Language = require('@google-cloud/language');
  const language = Language();

  const document = {
    'content': messageString,
    'type': 'PLAIN_TEXT'
  };

  return language.analyzeSentiment({ document: document })
    .then(results => {
      const sentimentScore = results[0].documentSentiment.score;
      const magnitudeScore = results[0].documentSentiment.magnitude;
      return sentimentRepo.addSentimentScore(sentimentScore, magnitudeScore, channelId, numberOfMessages);
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
    .then(results => {
      let newScoreData = camelizeKeys(results[0]);
      console.log(newScoreData);
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
}

module.exports = router;
