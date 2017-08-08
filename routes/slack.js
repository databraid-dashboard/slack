const express = require('express');
const request = require('request');
const { writeMessage } = require('../repositories/event-repository');
const { analyzeSentimentAndSaveScore } = require('../src/sentiment');

const router = express.Router();

router.get('/auth/redirect', (req, res) => {
  const options = {
    uri: `https://slack.com/api/oauth.access?code=${
      req.query.code
    }&client_id=${process.env.SLACK_CLIENT_ID
    }&client_secret=${process.env.SLACK_CLIENT_SECRET
    }&redirect_uri=${process.env.REDIRECT_URI}`,
    method: 'GET',
  };

  request(options, (error, response, body) => {
    const JSONresponse = JSON.parse(body);
    if (!JSONresponse.ok) {
      res.send(`Error encountered: \n${JSON.stringify(JSONresponse)}`).status(200).end();
    } else {
      res.send('Authenticating with Slack...');
    }
  });
});

router.get('/auth', (req, res) => {
  res.sendFile('/app/assets/html/add_to_slack.html');
});

function setEvents(io) {
  router.post('/events', (req, res) => {
    writeMessage(
      req.body.event.user,
      req.body.event.text,
      req.body.event.ts,
      req.body.event.channel,
    )
      .then((message) => {
        const newMessage = {};
        newMessage[message.id] = {};
        newMessage[message.id].userId = message.user_map_id;
        newMessage[message.id].text = message.message;
        newMessage[message.id].date = message.date;
        newMessage[message.id].channelId = message.channel_map_id;


        io.sockets.emit('messages', newMessage);

        analyzeSentimentAndSaveScore(io, message[0].channel_map_id);
      });
    res.send('SLACK!');
  });
}


module.exports = { router, setEvents };
