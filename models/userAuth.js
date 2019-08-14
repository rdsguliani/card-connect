const Sequelize = require('sequelize');
const sequelize = require('./../util/database');

const userAuth = sequelize.define('userAuth', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userName: {
        type: Sequelize.STRING(100),
    },
    password: {
        field: 'password',
        type: Sequelize.TEXT
    }
}, {
    freezeTableName: true
});

module.exports = userAuth;