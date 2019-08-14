
const mysql = require('mysql2/promise');
const Sequelize = require('sequelize');

const DB_NAME = process.env.db || 'cc_test';
const USER_NAME = process.env.user || 'root';
const PASSWORD = process.env.password || 'password';
const HOST = process.env.host || 'localhost';

mysql.createConnection({
    user     : USER_NAME,
    password : PASSWORD
}).then( (connection) => {
    console.log('validating connection')
    connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME};`).then(() => {
        // Safe to use sequelize now
    })
});

const sequelize =  new Sequelize({
    database: DB_NAME,
    username: USER_NAME,
    password: PASSWORD,
    host: HOST,
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize