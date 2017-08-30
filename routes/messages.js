const express = require('express');
const { getMessages, getMessagesByChannelName } = require('../repositories/message-repository');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', (req, res, next) => {
  getMessages()
    .then((messages) => {
      res.status(200).send(messages);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/:channelName', (req, res, next) => {
  getMessagesByChannelName(req.params.channelName)
    .then((messages) => {
      res.status(200).send(messages);
    })
    .catch((err) => {
      next(err);
    });
});
module.exports = router;