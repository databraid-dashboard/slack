const express = require('express');
const request = require('request');

const router = express.Router();

router.get('/', (req, res) => {

  const channels = ['3', '4', '5'];
  console.log('Channels route hit.');
  res.status(200).send(channels);
});




module.exports = router;
