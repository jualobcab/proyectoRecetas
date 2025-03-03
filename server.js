require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('database.js'); // Conectar SQLite o PostgreSQL

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Obtener todas las recetas
app.get('/recipes', (req, res) => {
    db.all('SELECT * FROM recipe', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Obtener receta por ID
app.get('/recipes/:id', (req, res) => {
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

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
