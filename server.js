require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./database'); // Conectar SQLite o PostgreSQL
const recetas = require('./public/scripts/recetas.js')

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Login y Register
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});
app.post('/login', (req, res) => {
    res.redirect('/recetas');
    //res.sendFile(path.join(__dirname, "public", "login.html"));
});
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "register.html"));
});
app.post('/register', (req, res) => {
    res.redirect('/recetas');
    //res.sendFile(path.join(__dirname, "public", "register.html"));
});

// Página principal
app.get('/recetas', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "principal.html"));
});

// Obtener todas las recetas
app.get('/api/listRecipes', (req, res) => {
    recetas.getAllRecipes(db,(err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

/*
// Obtener receta por ID
app.get('api/recipe/:id', (req, res) => {
    db.get('SELECT * FROM recipe WHERE recipe_id = ?', [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
});

// Agregar receta
app.post('/recipes', (req, res) => {
    const { recipe_name, cuisine_type, difficulty_level, preparation_time, steps } = req.body;
    db.run(`INSERT INTO recipe (recipe_name, cuisine_type, difficulty_level, preparation_time, steps) 
            VALUES (?, ?, ?, ?, ?)`,
        [recipe_name, cuisine_type, difficulty_level, preparation_time, steps],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ recipe_id: this.lastID });
        }
    );
});

// Eliminar receta
app.delete('/recipes/:id', (req, res) => {
    db.run('DELETE FROM recipe WHERE recipe_id = ?', [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Receta eliminada' });
    });
});
*/

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
