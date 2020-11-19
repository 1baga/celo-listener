const express = require('express');

const router = express.Router();

const config = require('../utils/config');

router.get('/', (req, res) => {
  res.json({ status: 'good' });
});

router.post('/', async (req, res) => {
  console.log('Adding wallet address to redis');
  const data = req.body;

  if (!data || !data.address) {
    res.status(400).json({ error: true, reason: 'Wallet address must be set' });
  }

  const client = config.redisClient;
  client.set(data.address, JSON.stringify(data));
  res.status(200).json({ success: true });
});

module.exports = router;
