const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs')
const fs = require('fs');

const filePath = './recetas.db';

let db;

if (!fs.existsSync(filePath)) {
    db = new sqlite3.Database(filePath);

    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS recipe (
            recipe_id INTEGER PRIMARY KEY AUTOINCREMENT,
            recipe_name TEXT NOT NULL,
            cuisine_type TEXT,
            difficulty_level INTEGER NOT NULL CHECK (difficulty_level BETWEEN 1 AND 5),
            preparation_time TEXT,
            steps TEXT NOT NULL
        );`);

        db.run(`CREATE TABLE IF NOT EXISTS usuarios (
            id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE
        );`);

        db.run(`INSERT INTO usuarios (nombre, password, email) VALUES
        ('admin','$2b$10$469TXLIEYYBJlYT/3kZRhunPtL8UKz/OwtE1Fm4ubp9ymq00xQ1pC','admin@fakeemail.com'),
        ('prueba','$2b$10$469TXLIEYYBJlYT/3kZRhunPtL8UKz/OwtE1Fm4ubp9ymq00xQ1pC','prueba@fakeemail.com');`);

        db.run(`INSERT INTO recipe (recipe_name, cuisine_type, difficulty_level, preparation_time, steps)
                VALUES 
                ('Spaghetti Carbonara', 'Italiana', 2, '20 minutos', 'Paso 1: Cocinar pasta...'),
                ('Tacos al Pastor', 'Mexicana', 3, '40 minutos', 'Paso 1: Preparar la carne...'),
                ('Sushi', 'Japonesa', 4, '60 minutos', 'Paso 1: Cocinar arroz...'),
                ('Ensalada César', 'Internacional', 1, '15 minutos', 'Paso 1: Lavar lechuga...'),
                ('Paella', 'Española', 5, '90 minutos', 'Paso 1: Preparar sofrito...');`);
    });
}
else {
    db = new sqlite3.Database(filePath);
}

module.exports = db;
