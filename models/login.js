const Sequelize = require('sequelize');
const sequelize = require('../config/database');


  const Login = sequelize.define('login', {
    no_hp: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    password: {
      type: Sequelize.STRING
    },
    verifikasi: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    },
    level: {
        type: Sequelize.STRING
    },
    login_time: {
        type: Sequelize.STRING
    },
    logout_time: {
        type: Sequelize.STRING
    },
    register_time: {
        type: Sequelize.STRING
    },
    verifikasi_time: {
        type: Sequelize.STRING
    },
    reset_time: {
        type: Sequelize.STRING
    },
    updated_time: {
        type: Sequelize.STRING
    },
    updated_by: {
        type: Sequelize.STRING
    },
    token: {
        type: Sequelize.STRING
    }
  },{
    freezeTableName: true,
    timestamps: false,
        defaultScope: {
          attributes: { exclude: ['password', 'token'] }
    }
  },
  
  
  );

  module.exports = Login;
