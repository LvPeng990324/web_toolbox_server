const redis = require('redis');
const server_config = require('../server_config');

const client = redis.createClient(server_config.redis_config);

client.on('error', (err) => {
    console.error('Redis connection error:', err);
});

client.connect();

module.exports = client;
