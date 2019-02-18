const Sequelize = require('sequelize');
const sequelize = require('../config/database');


  const Anggota = sequelize.define('anggota', {
    id_anggota: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    nama_anggota: {
      type: Sequelize.STRING
    },
    no_hp: {
        type: Sequelize.STRING
    },
    foto: {
        type: Sequelize.STRING
    },
    register_time: {
        type: Sequelize.STRING
    },
    update_time: {
        type: Sequelize.STRING
    }
  },{
    freezeTableName: true,
    timestamps: false
  },
  
  
  );

  module.exports = Anggota;
