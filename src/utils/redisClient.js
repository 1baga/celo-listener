/* eslint-disable no-console */
const redis = require('redis');
// const config = require('./config');

module.exports = (config) => {
  const client = redis.createClient(config.REDIS_ENDPOINT);

  client.on('error', (err) => {
    console.error('Error in redis client', err);
  });

  client.on('ready', () => {
    console.log('Redis is ready');
  });

  client.on('connect', () => {
    console.log('Redis is connected');
  });

  // client.set('mash', 'Umar Mash', redis.print);
  client.get('myaddress', redis.print);
  config.redisClient = client;
  return client;
};
