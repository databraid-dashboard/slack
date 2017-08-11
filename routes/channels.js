const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const channels = ['3', '4', '5'];
  res.status(200).send(channels);
});


module.exports = router;
