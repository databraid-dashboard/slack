const express = require('express');
const request = require('request');
const { writeMessage } = require('../repositories/event-repository');
const { analyzeSentimentAndSaveScore } = require('../src/sentiment');
const cors = require('cors');

// eslint-disable-next-line new-cap
const router = express.Router();

router.use(cors());

function handleNewMessageEvent(io, req) {
  return writeMessage(
    req.body.event.user,
    req.body.event.text,
    req.body.event.ts,
    req.body.event.channel,
  ).then((message) => {
    const channelId = message[0].channel_id;
    const messageId = message[0].message_id;

    const newMessage = {};
    newMessage[channelId] = {}; // Slack's channel ID as key
    newMessage[channelId][messageId] = {}; // Our message ID as key

    newMessage[channelId][messageId].avatarImage = '';
    newMessage[channelId][messageId].userId = message[0].user_id;
    newMessage[channelId][messageId].name = req.body.event.user; // To be changed after MVP
    newMessage[channelId][messageId].text = message[0].message;
    newMessage[channelId][messageId].timestamp = message[0].message_timestamp;
    newMessage[channelId][messageId].channelId = message[0].channel_id;

    console.log('>>>>>>>>>>>>>>', newMessage);

    io.sockets.emit('messages', newMessage);

    analyzeSentimentAndSaveScore(io, message[0].channel_id);
  });
}

router.get('/auth/redirect', (req, res) => {
  const options = {
    uri: `https://slack.com/api/oauth.access?code=${req.query.code}&client_id=${process.env
      .SLACK_CLIENT_ID}&client_secret=${process.env.SLACK_CLIENT_SECRET}`,
    method: 'GET',
  };

  request(options, (error, response, body) => {
    const JSONresponse = JSON.parse(body);

    if (!JSONresponse.ok) {
      res.send(`Error encountered: \n${JSON.stringify(JSONresponse)}`).status(200).end();
    } else {
      res.redirect('/');
    }
  });
});

router.get('/auth', (req, res) => {
  const buttonHTML = `<a href="https://slack.com/oauth/authorize?scope=channels:history,reactions:read,users:read&client_id=${process
    .env.SLACK_CLIENT_ID}&redirect_uri=${process.env
    .REDIRECT_URI}"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>`;
  return res.send(buttonHTML);
});

function setEvents(io) {
  router.post('/events', (req, res) => {
    switch (req.body.event.type) {
      case 'message':
        // message edited
        if (req.body.event.previous_message) {
          break;
        }
        // message deleted
        if (req.body.event.subtype && req.body.event.subtype === 'message_deleted') {
          break;
        }
        // message posted
        handleNewMessageEvent(io, req);
        break;

      default:
      // for now, ignore any messages not handled by the case conditions
    }
    res.sendStatus(200);
  });
}

module.exports = { router, setEvents };
