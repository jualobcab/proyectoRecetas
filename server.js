require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const sessions = require('express-session');
const db = require('./database'); // Conectar SQLite o PostgreSQL
const recetas = require('./public/scripts/recetas.js');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

// Pagina principal
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
app.get('/logout', (req, res) => {
    
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

// Obtener receta por ID
app.get('/api/recipe/:id', (req, res) => {
    recetas.getRecipeById(db, req.params.id, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
});

app.post('/api/addRecipe', (req, res) => {
    recetas.addRecipe(db, req.body, (err, resJSON) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(resJSON);
    });
});

app.post('/api/modifyRecipe', (req, res) => {
    recetas.updateRecipe(db, req.body, (err, resJSON) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(resJSON);
    });
});

// Eliminar receta
app.delete('/api/deleteRecipe/:id', (req, res) => {
    recetas.deleteRecipeById(db, req.params.id, (err, resJSON) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(resJSON);
    })
});



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
