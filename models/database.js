const { Sequelize } = require('sequelize');

// Conexión a SQLite (base de datos en memoria o archivo local)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'  // Archivo donde se almacenará la base de datos
});

module.exports = sequelize;
