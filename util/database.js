
const mysql = require('mysql2/promise');
const Sequelize = require('sequelize');

const DB_NAME = process.env.db || 'cc_test';
const USER_NAME = process.env.dbUser || 'root';
const PASSWORD = process.env.dbPassword || 'password';
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
    username: 'root',
    password: 'password',
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize