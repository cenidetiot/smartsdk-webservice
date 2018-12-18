const Sequelize = require('sequelize');
var mysql = require('../../config/config').mysql


module.exports = new Sequelize(mysql.db, mysql.user, mysql.password, {
    host: mysql.host,
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
    },
    define: {
      timestamps: false 
    }
});