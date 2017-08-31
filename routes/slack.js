const express = require('express');
const request = require('request');

const { handleNewMessageEvent } = require('../src/slack/message-event-handlers');

const router = express.Router();

router.get('/auth/redirect', (req, res) => {
  const options = {
    uri: `https://slack.com/api/oauth.access?code=${
      req.query.code
    }&client_id=${process.env.SLACK_CLIENT_ID
    }&client_secret=${process.env.SLACK_CLIENT_SECRET}`,
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
    console.log(req.body.event);
    switch (req.body.event.type) {
      case 'message':
        // message edited
        if (req.body.event.previous_message) {
          break;
        }
        // message deleted
        if (req.body.event.subtype
          && req.body.event.subtype === 'message_deleted') {
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
