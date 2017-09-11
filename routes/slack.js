const express = require('express');
const request = require('request');
const { setOption } = require('../repositories/option-repository');
const { handleNewMessageEvent } = require('../src/slack/message-event-handlers');
const cors = require('cors');

// eslint-disable-next-line new-cap
const router = express.Router();

router.use(cors());

router.get('/auth/redirect', (req, res) => {
  // This gets hit after click event to log in, and the slack 'app' sends back a code
  const options = {
    uri: `https://slack.com/api/oauth.access?code=${req.query.code}&client_id=${process.env
      .SLACK_CLIENT_ID}&client_secret=${process.env.SLACK_CLIENT_SECRET}`,
    method: 'GET',
  };

  request(options, (error, response, body) => {
    const JSONresponse = JSON.parse(body);
    if (!JSONresponse.ok) {
      res
        .send(`Error encountered: \n${JSON.stringify(JSONresponse)}`)
        .status(200)
        .end();
    } else {
      setOption('oauth_token', JSONresponse.access_token);
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
  // This gets hit after a message is sent inside the literal slack app
  // and picked up by the slack 'app' (https://api.slack.com/apps/Databraid_Slack_App)
  router.post('/events', (req, res) => {
    const { type, subtype } = req.body.event;
    switch (type) {
      case 'message':
        // message edited
        if (subtype === 'message_changed') {
          handleEditMessageEvent(req);
          break;
        }
        // message deleted
        if (subtype === 'message_deleted') {
          handleDeleteMessageEvent(req);
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
