const express = require('express');
const request = require('request');
const { writeMessage } = require('../repositories/event-repository');
const { updateOption } = require('../repositories/option-repository');
const { analyzeSentimentAndSaveScore } = require('../src/sentiment');

const router = express.Router();

function handleNewMessageEvent(io, req) {
  return writeMessage(
    req.body.event.user,
    req.body.event.text,
    req.body.event.ts,
    req.body.event.channel,
<<<<<<< HEAD
  ).then((message) => {
    const channelId = message[0].channel_map_id;
    const messageId = message[0].id;
=======
  )
    .then((message) => {
      const channelId = message[0].channel_id;
      const messageId = message[0].message_id;
>>>>>>> 815ae2e3d59358689b98a530bcb16491d21cf66d

    const newMessage = {};
    newMessage[channelId] = {}; // Slack's channel ID as key
    newMessage[channelId][messageId] = {}; // Our message ID as key

<<<<<<< HEAD
    newMessage[channelId][messageId].avatarImage = '';
    newMessage[channelId][messageId].userId = message[0].user_map_id;
    newMessage[channelId][messageId].name = req.body.event.user; // To be changed after MVP
    newMessage[channelId][messageId].text = message[0].message;
    newMessage[channelId][messageId].timestamp = message[0].message_timestamp;
    newMessage[channelId][messageId].channelId = message[0].channel_map_id;
=======
      newMessage[channelId][messageId].avatarImage = '';
      newMessage[channelId][messageId].userId = message[0].user_id;
      newMessage[channelId][messageId].name = req.body.event.user;// To be changed after MVP
      newMessage[channelId][messageId].text = message[0].message;
      newMessage[channelId][messageId].timestamp = message[0].message_timestamp;
      newMessage[channelId][messageId].channelId = message[0].channel_id;
>>>>>>> 815ae2e3d59358689b98a530bcb16491d21cf66d

    io.sockets.emit('messages', newMessage);

<<<<<<< HEAD
    analyzeSentimentAndSaveScore(io, message[0].channel_map_id);
  });
=======
      analyzeSentimentAndSaveScore(io, message[0].channel_id);
    });
>>>>>>> 815ae2e3d59358689b98a530bcb16491d21cf66d
}

router.get('/auth/redirect', (req, res) => {
  // This gets hit after click event to log in, and the slack 'app' sends back a code
  const options = {
    uri: `https://slack.com/api/oauth.access?code=${req.query.code}&client_id=${process.env
      .SLACK_CLIENT_ID}&client_secret=${process.env.SLACK_CLIENT_SECRET}&redirect_uri=${process.env
      .REDIRECT_URI}`,
    method: 'GET',
  };

  request(options, (error, response, body) => {
    const JSONresponse = JSON.parse(body);
    if (!JSONresponse.ok) {
      res.send(`Error encountered: \n${JSON.stringify(JSONresponse)}`).status(200).end();
    } else {
      updateOption('oauth_token', JSONresponse.access_token);
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
  // This gets hit after a message is sent inside the literal slack app, and picked up by the slack 'app' (https://api.slack.com/apps/Databraid_Slack_App)
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
<<<<<<< HEAD
      // for now, ignore any messages not handled by the case conditions
=======
        // for now, ignore any messages not handled by the case conditions
>>>>>>> 815ae2e3d59358689b98a530bcb16491d21cf66d
    }
    res.sendStatus(200);
  });
}

module.exports = { router, setEvents };
