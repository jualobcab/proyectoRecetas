const { DataTypes } = require('sequelize');
const sequelize = require('./database');

// Definimos el modelo de Receta
const Recipe = sequelize.define('Recipe', {
  recipe_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  recipe_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cuisine_type: {
    type: DataTypes.STRING
  },
  difficulty_level: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  preparation_time: {
    type: DataTypes.INTEGER // Tiempo en minutos
  },
  steps: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: false
});

// Sincronizar el modelo con la base de datos (crear la tabla si no existe)
Recipe.sync();

module.exports = Recipe;
