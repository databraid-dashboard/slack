const express = require('express');
const request = require('request');
const { writeMessage } = require('../repositories/event-repository');

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
      res.send('Success!');
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
        newMessage[message.raw_ts] = {};
        newMessage[message.raw_ts].userId = message.user_map_id;
        newMessage[message.raw_ts].text = message.message;
        newMessage[message.raw_ts].date = message.date;
        newMessage[message.raw_ts].channelId = message.channel_map_id;

        io.sockets.emit('messages', newMessage);
      });
    res.send('SLACK!');
  });
}


module.exports = { router, setEvents };
