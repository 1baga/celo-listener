const express = require('express');

const wallet = require('./wallet');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'V1-API good'
  });
});

router.use('/wallet', wallet);

module.exports = router;
