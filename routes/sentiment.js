const express = require('express');
const { camelizeKeys, decamelizeKeys } = require('humps');
const rp = require('request-promise');

const router = express.Router();

const SentimentRepository = require('../repositories/sentiment-repository');
const sentimentRepo = new SentimentRepository();

//const GOOGLE_SENTIMENT_ANALYSIS_API_URL = "https://language.googleapis.com/v1beta2/documents:analyzeSentiment"


// ----------EXAMPLE TO RETRIEVE MESSAGES-----------
// router.get('/', (req, res) => {
//   sentimentRepo.fetchMessageBatch().then((messages) => {
//     res.send(camelizeKeys(messages));
//   })
//   .catch(err =>
//     res.status(500).send(err));
// });


//------------SAVES FETCHED MESSAGES FROM DB-------------
sentimentRepo.fetchMessageBatch()
  .then(messages => {
    let messagesArray = messages.map(msgObject => msgObject.message);
    return messagesArray.join('\n')
  })
  .then(messagesText => {
    analyzeSentimentOfText(messagesText);
  })

//----------EXAMPLE OF GOOGLE SENTIMENT ANALYSIS
//let text = "This is a sentence. This is a happy sentence about joy and good things. Also, this is about more great things. Here is another sentence."

function analyzeSentimentOfText (text) {
  // [START language_sentiment_string]
  // Imports the Google Cloud client library
  const Language = require('@google-cloud/language');

  // Instantiates a client
  const language = Language();

  // The text to analyze, e.g. "Hello, world!"
  // const text = 'Hello, world!';

  const document = {
    'content': text,
    type: 'PLAIN_TEXT'
  };

  // Detects the sentiment of the document
  // 'return' the following line to return a promise out of this function, allowing me to take further steps
  language.analyzeSentiment({ document: document })
    .then((results) => {
      const sentiment = results[0].documentSentiment;
      console.log(`Document sentiment:`);
      console.log(`  Score: ${sentiment.score}`);
      console.log(`  Magnitude: ${sentiment.magnitude}`);

      const sentences = results[0].sentences;
      sentences.forEach((sentence) => {
        console.log(`Sentence: ${sentence.text.content}`);
        console.log(`  Score: ${sentence.sentiment.score}`);
        console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
      });
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
  // [END language_sentiment_string]
}

module.exports = router;
