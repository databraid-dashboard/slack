const express = require('express');
const { getChannels } = require('../repositories/channel-repository');

const router = express.Router();

router.get('/channels', (req, res) => (
  getChannels()
    .then((channels) => {
      res.send(channels);
    })
));

module.exports = router;
