const express = require('express');
const { getMessages, getMessagesByChannelName } = require('../repositories/message-repository');
const cors = require('cors');

// eslint-disable-next-line new-cap
const router = express.Router();

router.use(cors());

router.get('/messages', (req, res, next) => {
  getMessages()
    .then((messages) => {
      res.status(200).send(messages);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/messages/:channelName', (req, res, next) => {
  getMessagesByChannelName(req.params.channelName)
    .then((messages) => {
      res.status(200).send(messages);
    })
    .catch((err) => {
      next(err);
    });
});
module.exports = router;
