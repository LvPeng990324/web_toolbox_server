exports.db_config = {
    host: 'localhost', // 数据库主机
    user: 'root',      // 数据库用户名
    password: '123456', // 数据库密码
    database: 'test_sql' // 数据库名称
};

exports.redis_config = {
    host: '127.0.0.1', // Redis服务器主机
    port: 6379,        // Redis服务器端口
    password: ''
};

// 服务器启动端口
exports.server_port = 3000;

// token过期时间，毫秒
exports.token_expire_ms = 7 * 24 * 60 * 60 * 1000;