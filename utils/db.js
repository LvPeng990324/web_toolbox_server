const mysql = require('mysql2');
const server_config = require('../server_config');

const pool = mysql.createPool(server_config.db_config);

module.exports = pool.promise();
