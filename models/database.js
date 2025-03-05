const { Sequelize } = require('sequelize');

// Conexión a SQLite (base de datos en memoria o archivo local)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'  // Archivo donde se almacenará la base de datos
});

// Sincronizar el modelo con la base de datos (sin borrar las tablas)
sequelize.sync({ alter: true }).then(() => {
  console.log('Base de datos sincronizada.');
}).catch((err) => {
  console.error('Error al sincronizar la base de datos:', err);
});

module.exports = sequelize;
