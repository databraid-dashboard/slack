const express = require('express');
const request = require('request');

const router = express.Router();
// const { io } = require('../index');


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
  res.sendFile(`/app/assets/html/add_to_slack.html`);
});

function setEvents(io){
  router.post('/events', (req, res) => {
    /* eslint-disable no-console */
    console.log(req.body.event);
    io.sockets.emit('messages', req.body.event);
    res.send('SLACK!');
  });
}



module.exports = {router, setEvents};
