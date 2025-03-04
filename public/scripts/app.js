document.addEventListener('DOMContentLoaded', () => {
    // Función para cargar todas las recetas desde el servidor
    fetch('http://localhost:3000/recipes')
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById('recipeTable').getElementsByTagName('tbody')[0];
            data.forEach(recipe => {
                let row = table.insertRow();
                row.innerHTML = `
                    <td class="px-4 py-2 border">${recipe.recipe_name}</td>
                    <td class="px-4 py-2 border">${recipe.cuisine_type}</td>
                    <td class="px-4 py-2 border">${recipe.preparation_time}</td>
                    <td class="px-4 py-2 border">
                        <button onclick="deleteRecipe(${recipe.recipe_id})" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Eliminar</button>
                    </td>
                `;
            });
        })
        .catch(error => console.error('Error al cargar recetas:', error));
});

// Función para eliminar una receta
function deleteRecipe(id) {
    fetch(`http://localhost:3000/recipes/${id}`, { method: 'DELETE' })
        .then(() => {
            alert('Receta eliminada');
            location.reload(); // Recargar la página para actualizar la tabla
        })
        .catch(error => console.error('Error al eliminar receta:', error));
}