const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:juan@localhost:5433/ciclas');

const Incidente = sequelize.define('incidente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  latitud: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  longitud: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  tipo_obstaculo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  foto: {
    type: DataTypes.BLOB('long'),
    allowNull: true
  }
});

sequelize.sync();

module.exports = { Incidente };
