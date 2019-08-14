const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const tempalte = sequelize.define('template', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tempalte: {
        type: Sequelize.JSON
    }
})

module.exports = tempalte;
