document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");
    const buttons = document.querySelectorAll(".tab-button");

    // Función para cambiar el contenido según la pestaña seleccionada
    function loadSection(section) {
        content.innerHTML = "";
        buttons.forEach(btn => btn.classList.remove("bg-opacity-50"));
        document.querySelector(`[data-section='${section}']`).classList.add("bg-opacity-50");

        if (section === "lista") {
            loadTable();
        } else if (section === "añadir") {
            loadAddForm();
        } else if (section === "modificar") {
            loadModifyForm();
        }
    }

    // Función para cargar la tabla con las recetas
    function loadTable() {
        content.innerHTML = `
            <table class="w-full border-collapse border border-gray-300">
                <thead>
                    <tr class="bg-gray-200">
                        <th class="border border-gray-300 p-2">ID</th>
                        <th class="border border-gray-300 p-2">Nombre</th>
                        <th class="border border-gray-300 p-2">Tipo</th>
                        <th class="border border-gray-300 p-2">Dificultad</th>
                        <th class="border border-gray-300 p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody id="recipe-table">
                    <!-- Las recetas se insertarán aquí -->
                </tbody>
            </table>
        `;
        fetchRecipes();
    }

    // Función para cargar el formulario de añadir receta
    function loadAddForm() {
        content.innerHTML = `
            <form id="add-form" class="space-y-4">
                <input type="text" id="recipe-name" placeholder="Nombre de la receta" class="w-full p-2 border rounded">
                <input type="text" id="cuisine-type" placeholder="Tipo de cocina" class="w-full p-2 border rounded">
                <input type="number" id="difficulty" min="1" max="5" placeholder="Dificultad (1-5)" class="w-full p-2 border rounded">
                <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Añadir</button>
            </form>
        `;
    }

    // Función para cargar el formulario de modificar receta
    function loadModifyForm() {
        content.innerHTML = `
            <form id="modify-form" class="space-y-4">
                <select id="recipe-id" class="w-full p-2 border rounded">
                    <option value="">Selecciona una receta</option>
                </select>
                <input type="text" id="new-name" placeholder="Nuevo nombre" class="w-full p-2 border rounded">
                <button type="submit" class="bg-yellow-500 text-white px-4 py-2 rounded">Modificar</button>
            </form>
        `;
        populateRecipeSelect();
    }

    // Simulación de datos y carga de la tabla
    function fetchRecipes() {
        const tableBody = document.getElementById("recipe-table");
        //const recipes = recetas.getAllRecipes((err, rows) => {
        fetch("/api/listRecipes")
            .then(response => response.json())
            .then(rows => {
            
                tableBody.innerHTML = rows.map(recipe => `
                    <tr>
                        <td class="border p-2">${recipe.recipe_id}</td>
                        <td class="border p-2">${recipe.recipe_name}</td>
                        <td class="border p-2">${recipe.cuisine_type}</td>
                        <td class="border p-2">${recipe.difficulty_level}</td>
                        <td class="border p-2">
                            <button class="bg-yellow-400 px-2 py-1 rounded" onclick="loadModifyForm(${recipe.id})">✏️</button>
                            <button class="bg-red-500 px-2 py-1 text-white rounded">🗑️</button>
                        </td>
                    </tr>
                `).join("");
        })
        .catch(error => console.error("Error al obtener recetas:", error));
    }

    // Población del select en modificar   HACE FALTA QUE EN VEZ DE ESTO COJA TODOS LOS NOMBRES DE RECETAS O ID'S
    function populateRecipeSelect() {
        const select = document.getElementById("recipe-id");
        select.innerHTML += `
            <option value="1">Pasta Carbonara</option>
            <option value="2">Tacos al Pastor</option>
        `;
    }

    // Manejo de botones
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            loadSection(button.dataset.section);
        });
    });

    // Cargar lista por defecto
    loadSection("lista");

    // Manejo del logout
    document.getElementById("logout").addEventListener("click", () => {
        alert("Cerrando sesión...");
        window.location.href = "index.html";
    });
});