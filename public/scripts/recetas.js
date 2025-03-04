// Función para recuperar todas las recetas
function getAllRecipes(db, callback) {
    const query = 'SELECT * FROM recipe';
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error al recuperar las recetas:', err);
            return callback(err, null);
        }
        callback(null, rows);  // Devuelve todas las recetas
    });
}

// Función para recuperar una receta por ID
function getRecipeById(id, callback) {
    const query = 'SELECT * FROM recipe WHERE recipe_id = ?';
    db.get(query, [id], (err, row) => {
        if (err) {
            console.error(`Error al recuperar la receta con ID ${id}:`, err);
            return callback(err, null);
        }
        callback(null, row);  // Devuelve la receta con el ID proporcionado
    });
}

// Función para agregar una nueva receta
function addRecipe(recipeData, callback) {
    const { recipe_name, cuisine_type, difficulty_level, preparation_time, steps } = recipeData;
    const query = 'INSERT INTO recipe (recipe_name, cuisine_type, difficulty_level, preparation_time, steps) VALUES (?, ?, ?, ?, ?)';
    
    db.run(query, [recipe_name, cuisine_type, difficulty_level, preparation_time, steps], function(err) {
        if (err) {
            console.error('Error al agregar la receta:', err);
            return callback(err, null);
        }
        callback(null, { recipe_id: this.lastID });  // Devuelve el ID de la receta recién agregada
    });
}

// Función para eliminar una receta por ID
function deleteRecipeById(id, callback) {
    const query = 'DELETE FROM recipe WHERE recipe_id = ?';
    
    db.run(query, [id], function(err) {
        if (err) {
            console.error(`Error al eliminar la receta con ID ${id}:`, err);
            return callback(err, null);
        }
        callback(null, { message: `Receta con ID ${id} eliminada` });  // Devuelve un mensaje de éxito
    });
}

module.exports = {
    getAllRecipes,
    getRecipeById,
    addRecipe,
    deleteRecipeById
};