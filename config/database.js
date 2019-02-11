var config = {
    user: 'root',
    password: '',
    server: 'localhost',
    database: 'stock' 
}

const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.server,
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
  

module.exports = sequelize;
