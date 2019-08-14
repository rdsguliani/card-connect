const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const user = sequelize.define( 'user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    userStatus: {
        type: Sequelize.ENUM('ACTIVE', 'PENDING', 'INACTIVE', 'DELETED'),
        defaultValue: 'ACTIVE'
    },
    userType: {
        type: Sequelize.ENUM('PREMIUM', 'NON-PREMIUM'),
        defaultValue: 'NON-PREMIUM'
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    mobile: {
        type: Sequelize.CHAR(15)   
    },
    fax: {
        type: Sequelize.CHAR(15)   
    },
    landLine: {
        type: Sequelize.CHAR(15)
    }
});


module.exports = user;