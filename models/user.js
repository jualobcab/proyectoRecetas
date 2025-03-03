const { DataTypes } = require('sequelize');
const sequelize = require('./database');

// Definimos el modelo de usuario
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false, // No necesitamos los campos 'createdAt' y 'updatedAt' en este caso
});

// Sincronizar el modelo con la base de datos (crear la tabla si no existe)
User.sync();

module.exports = User;
