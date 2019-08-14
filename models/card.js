const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const card = sequelize.define('card', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    card: {
        type: Sequelize.JSON,
        allowNull: false
    }
})

module.exports = card;
