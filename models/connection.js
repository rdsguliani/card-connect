const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const User = require('./user');


const connection = sequelize.define('connection', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    senderId: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    receiverId: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
});

module.exports = connection;
