const redis = require('redis');

const client = redis.createClient({
    host: '127.0.0.1', // Redis服务器主机
    port: 6379,        // Redis服务器端口
    // password: 'your_password' // 如果Redis服务器设置了密码，请取消注释并填写密码
});

client.on('error', (err) => {
    console.error('Redis connection error:', err);
});

client.connect();

module.exports = client;
