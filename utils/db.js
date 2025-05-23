const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost', // 数据库主机
    user: 'root',      // 数据库用户名
    password: '123456', // 数据库密码
    database: 'test_sql' // 数据库名称
});

module.exports = pool.promise();
