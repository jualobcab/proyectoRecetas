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
        // Limpiar el contenido actual
        content.innerHTML = '';
    
        // Crear la tabla
        const table = document.createElement('table');
        table.className = 'w-full border-collapse border border-gray-300';
    
        // Crear el encabezado de la tabla
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        headerRow.className = 'bg-gray-200';
    
        // Crear y añadir las celdas de encabezado
        const headers = ['ID', 'Nombre', 'Tipo', 'Dificultad', 'Tiempo de preparación', 'Pasos', 'Acciones'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.className = 'border border-gray-300 p-2';
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
    
        thead.appendChild(headerRow);
        table.appendChild(thead);
    
        // Crear el cuerpo de la tabla
        const tbody = document.createElement('tbody');
        tbody.id = 'recipe-table'; // Para poder manipular la tabla más tarde
        table.appendChild(tbody);
    
        // Agregar la tabla al contenido
        content.appendChild(table);
    
        // Llamar a la función para obtener las recetas
        fetchRecipes();
    }
    

    // Función para cargar el formulario de añadir receta
    function loadAddForm() {
        // Limpiar el contenido antes de agregar el formulario
        content.replaceChildren();
    
        // Crear el formulario
        const form = document.createElement("form");
        form.id = "add-form";
        form.className = "space-y-4";
    
        // Función auxiliar para crear un campo con label
        function createInputField(labelText, inputType, inputId, placeholder) {
            const wrapper = document.createElement("div");
    
            const label = document.createElement("label");
            label.setAttribute("for", inputId);
            label.textContent = labelText;
            label.className = "block font-medium";
    
            const input = document.createElement("input");
            input.type = inputType;
            input.id = inputId;
            input.placeholder = placeholder;
            input.className = "w-full p-2 border rounded";
    
            wrapper.appendChild(label);
            wrapper.appendChild(input);
    
            return wrapper;
        }
    
        // Campos del formulario
        form.appendChild(createInputField("Nombre de la receta", "text", "recipe-name", "Ej: Ensalada César"));
        form.appendChild(createInputField("Tipo de cocina", "text", "cuisine-type", "Ej: Italiana, Mexicana"));
        form.appendChild(createInputField("Tiempo de preparación (minutos)", "number", "preparation-time", "Ej: 30"));
    
        // Campo: Dificultad (Select)
        const difficultyWrapper = document.createElement("div");
    
        const difficultyLabel = document.createElement("label");
        difficultyLabel.textContent = "Dificultad";
        difficultyLabel.className = "block font-medium";
    
        const difficultySelect = document.createElement("select");
        difficultySelect.id = "difficulty";
        difficultySelect.className = "w-full p-2 border rounded";
    
        // Opciones de dificultad (1 a 5)
        for (let i = 1; i <= 5; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = `Dificultad ${i}`;
            difficultySelect.appendChild(option);
        }
    
        difficultyWrapper.appendChild(difficultyLabel);
        difficultyWrapper.appendChild(difficultySelect);
        form.appendChild(difficultyWrapper);

        // Campo: Pasos de preparación
        const stepsWrapper = document.createElement("div");
        const stepsLabel = document.createElement("label");
        stepsLabel.setAttribute("for", "recipe-steps");
        stepsLabel.textContent = "Pasos de preparación";
        stepsLabel.className = "block font-medium";
    
        const stepsTextarea = document.createElement("textarea");
        stepsTextarea.id = "recipe-steps";
        stepsTextarea.placeholder = "Describe los pasos de la receta...";
        stepsTextarea.className = "w-full p-2 border rounded";
        stepsTextarea.rows = 4;
    
        stepsWrapper.appendChild(stepsLabel);
        stepsWrapper.appendChild(stepsTextarea);
        form.appendChild(stepsWrapper);
    
        // Botón de enviar
        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.className = "bg-green-500 text-white px-4 py-2 rounded";
        submitButton.textContent = "Añadir";
    
        form.appendChild(submitButton);
    
        // Agregar el formulario al contenido
        content.appendChild(form);
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
        fetch("/api/listRecipes")
            .then(response => response.json())
            .then(rows => {
                // Limpiar la tabla antes de agregar nuevos datos
                tableBody.replaceChildren(); 
    
                rows.forEach(recipe => {
                    const row = document.createElement("tr");
    
                    const columns = [
                        recipe.recipe_id,
                        recipe.recipe_name,
                        recipe.cuisine_type,
                        recipe.difficulty_level,
                        recipe.preparation_time
                    ];
    
                    // Crear celdas para los datos de la receta
                    columns.forEach(text => {
                        const td = document.createElement("td");
                        td.className = "border p-2";
                        td.textContent = text;
                        row.appendChild(td);
                    });
    
                    // Botón de vista 👁
                    const viewTd = document.createElement("td");
                    viewTd.className = "border p-2";
                    const viewBtn = document.createElement("button");
                    viewBtn.className = "bg-blue-500 px-2 py-1 text-white rounded";
                    viewBtn.textContent = "👁";
                    viewTd.appendChild(viewBtn);
                    row.appendChild(viewTd);
    
                    // Celda de acciones (Modificar y Eliminar)
                    const actionsTd = document.createElement("td");
                    actionsTd.className = "border p-2";
    
                    // Botón de Modificar ✏️
                    const modifyBtn = document.createElement("button");
                    modifyBtn.className = "bg-yellow-400 px-2 py-1 rounded";
                    modifyBtn.textContent = "✏️";
                    modifyBtn.onclick = () => loadModifyForm(recipe.id);
    
                    // Botón de Eliminar 🗑️
                    const deleteBtn = document.createElement("button");
                    deleteBtn.className = "bg-red-500 px-2 py-1 text-white rounded";
                    deleteBtn.textContent = "🗑️";
                    
                    // Agregar botones a la celda
                    actionsTd.appendChild(modifyBtn);
                    actionsTd.appendChild(deleteBtn);
                    row.appendChild(actionsTd);
    
                    // Agregar la fila a la tabla
                    tableBody.appendChild(row);
                });
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