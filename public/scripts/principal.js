document.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.getElementById("main");
    const content = document.getElementById("content");
    const buttons = document.querySelectorAll(".tab-button");

    // Función para cambiar el contenido según la pestaña seleccionada
    function loadSection(section) {
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
        content.replaceChildren();
    
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
        let formularios = document.getElementById("formularios");

        if (!formularios) {
            // En caso de no existir lo crea
            formularios = document.createElement("div");
            formularios.id = "formularios";
            formularios.classList = "w-1/3";
        }
    
        // Crear el formulario
        const form = document.createElement("form");
        form.action = "/api/addRecipe";
        form.method = "POST";
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
        formularios.replaceChildren();
        formularios.appendChild(form);
        mainContent.prepend(formularios);
    }

    // Función para cargar el formulario de modificar receta
    function loadModifyForm(recipe_id) {
        let formularios = document.getElementById("formularios");

        if (!formularios) {
            // En caso de no existir lo crea
            formularios = document.createElement("div");
            formularios.id = "formularios";
            formularios.classList = "w-1/3";
        }
    
        // Crear el formulario
        const form = document.createElement('form');
        form.id = 'modify-form';
        form.className = 'space-y-4';
    
        // Función auxiliar para crear un campo con label
        function createInputField(labelText, inputType, inputId, placeholder) {
            const wrapper = document.createElement('div');
    
            const label = document.createElement('label');
            label.setAttribute('for', inputId);
            label.textContent = labelText;
            label.className = 'block font-medium';
    
            const input = document.createElement('input');
            input.type = inputType;
            input.id = inputId;
            input.placeholder = placeholder;
            input.className = 'w-full p-2 border rounded';
    
            wrapper.appendChild(label);
            wrapper.appendChild(input);
    
            return wrapper;
        }
    
        // Selección de receta
        const selectWrapper = document.createElement('div');
    
        const selectLabel = document.createElement('label');
        selectLabel.textContent = 'Selecciona una receta a modificar';
        selectLabel.className = 'block font-medium';
    
        const select = document.createElement('select');
        select.id = 'recipe-id';
        select.className = 'w-full p-2 border rounded';
    
        // Opción por defecto
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Selecciona una receta';
        select.appendChild(defaultOption);
    
        selectWrapper.appendChild(selectLabel);
        selectWrapper.appendChild(select);
        form.appendChild(selectWrapper);
    
        // Campos del formulario
        form.appendChild(createInputField('Nombre de la receta', 'text', 'recipe-name', 'Ej: Ensalada César'));
        form.appendChild(createInputField('Tipo de cocina', 'text', 'cuisine-type', 'Ej: Italiana, Mexicana'));
        form.appendChild(createInputField('Tiempo de preparación (minutos)', 'number', 'preparation-time', 'Ej: 30'));
    
        // Campo: Dificultad (Select)
        const difficultyWrapper = document.createElement('div');
    
        const difficultyLabel = document.createElement('label');
        difficultyLabel.textContent = 'Dificultad';
        difficultyLabel.className = 'block font-medium';
    
        const difficultySelect = document.createElement('select');
        difficultySelect.id = 'difficulty';
        difficultySelect.className = 'w-full p-2 border rounded';
    
        // Opciones de dificultad (1 a 5)
        for (let i = 1; i <= 5; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Dificultad ${i}`;
            difficultySelect.appendChild(option);
        }
    
        difficultyWrapper.appendChild(difficultyLabel);
        difficultyWrapper.appendChild(difficultySelect);
        form.appendChild(difficultyWrapper);
    
        // Campo: Pasos de preparación
        const stepsWrapper = document.createElement('div');
        const stepsLabel = document.createElement('label');
        stepsLabel.setAttribute('for', 'recipe-steps');
        stepsLabel.textContent = 'Pasos de preparación';
        stepsLabel.className = 'block font-medium';
    
        const stepsTextarea = document.createElement('textarea');
        stepsTextarea.id = 'recipe-steps';
        stepsTextarea.placeholder = 'Describe los pasos de la receta...';
        stepsTextarea.className = 'w-full p-2 border rounded';
        stepsTextarea.rows = 4;
    
        stepsWrapper.appendChild(stepsLabel);
        stepsWrapper.appendChild(stepsTextarea);
        form.appendChild(stepsWrapper);
    
        // Botón de modificar
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.className = 'bg-yellow-500 text-white px-4 py-2 rounded';
        submitButton.textContent = 'Modificar';
    
        form.appendChild(submitButton);
    
        // Agregar el formulario al contenido
        formularios.replaceChildren();
        formularios.appendChild(form);
        mainContent.prepend(formularios);
    
        // Llamar a la función para poblar el select con las recetas disponibles
        populateRecipeSelect();

        if(typeof recipe_id !== "undefined" && recipe_id!==null){
            const selectedId = recipe_id;
    
            loadRecipeData(selectedId);
        }
    }    

    // Pintar la receta dada
    function paintRecipeData(recipe_id) {
        // Realiza la solicitud para obtener los datos de la receta
        fetch(`/api/recipe/${recipe_id}`)
            .then(response => response.json())
            .then(recipe => {
                let formularios = document.getElementById("formularios");

                if (!formularios) {
                    // En caso de no existir lo crea
                    formularios = document.createElement("div");
                    formularios.id = "formularios";
                    formularios.classList = "w-1/3";
                }

                const recipeDetails = document.createElement("div");
                recipeDetails.classList = "p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md space-y-6";
    
                // Título de la receta
                const recipeTitle = document.createElement('h2');
                recipeTitle.className = 'text-3xl font-semibold text-gray-800';
                recipeTitle.textContent = recipe.recipe_name; // Asegúrate de que 'name' sea el campo correcto de la receta
    
                // Tipo de cocina
                const recipeCuisine = document.createElement('p');
                recipeCuisine.className = 'text-lg text-gray-600';
                recipeCuisine.textContent = `Tipo de cocina: ${recipe.cuisine_type}`;
    
                // Tiempo de preparación
                const preparationTime = document.createElement('p');
                preparationTime.className = 'text-lg text-gray-600';
                preparationTime.textContent = `Tiempo de preparación: ${recipe.preparation_time}`;
    
                // Dificultad
                const recipeDifficulty = document.createElement('p');
                recipeDifficulty.className = 'text-lg text-gray-600';
                recipeDifficulty.textContent = `Dificultad: ${recipe.difficulty_level}`;
    
                // Pasos de preparación
                const recipeStepsTitle = document.createElement('h3');
                recipeStepsTitle.className = 'text-2xl font-semibold text-gray-800';
                recipeStepsTitle.textContent = 'Pasos de preparación';
    
                const recipeSteps = document.createElement('p');
                recipeSteps.className = 'text-gray-700';
                recipeSteps.textContent = recipe.steps;
    
                // Append the elements to the main recipeDetails div
                recipeDetails.appendChild(recipeTitle);
                recipeDetails.appendChild(recipeCuisine);
                recipeDetails.appendChild(preparationTime);
                recipeDetails.appendChild(recipeDifficulty);
                recipeDetails.appendChild(recipeStepsTitle);
                recipeDetails.appendChild(recipeSteps);
    
                // Agregar los detalles al contenido
                formularios.replaceChildren();
                formularios.appendChild(recipeDetails);
                mainContent.prepend(formularios);
            })
            .catch(error => {
                console.error('Error al obtener la receta:', error);
            });
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
                    viewBtn.addEventListener("click", () => {
                        paintRecipeData(recipe.recipe_id);
                    });
                    viewTd.appendChild(viewBtn);
                    row.appendChild(viewTd);
    
                    // Celda de acciones (Modificar y Eliminar)
                    const actionsTd = document.createElement("td");
                    actionsTd.className = "border p-2";
    
                    // Botón de Modificar ✏️
                    const modifyBtn = document.createElement("button");
                    modifyBtn.className = "bg-yellow-400 px-2 py-1 rounded";
                    modifyBtn.textContent = "✏️";
                    modifyBtn.addEventListener("click", () => {
                        loadModifyForm(recipe.recipe_id);
                    });
    
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

    // Población del select en modificar
    function populateRecipeSelect() {
        const select = document.getElementById("recipe-id");
    
        // Limpiar el select antes de agregar opciones
        select.innerHTML = '<option value="" hidden>Selecciona una receta</option>';
    
        // Obtener las recetas desde la API
        fetch('/api/listRecipes')
            .then(response => response.json())
            .then(recipes => {
                recipes.forEach(recipe => {
                    const option = document.createElement("option");
                    option.value = recipe.recipe_id;
                    option.textContent = recipe.recipe_name;
                    select.appendChild(option);
                });
            })
            .catch(error => console.error("Error al cargar recetas:", error));
    
        // Evento para detectar cambios en la selección
        select.addEventListener("change", function () {
            const selectedId = select.value;
    
            loadRecipeData(selectedId);
        });
    } 
    
    function loadRecipeData(selectedId) {
        if (selectedId) {
            // Obtener los datos de la receta seleccionada desde la API
            fetch(`/api/recipe/${selectedId}`)
                .then(response => response.json())
                .then(recipe => {
                    document.getElementById("recipe-id").value = selectedId;
                    document.getElementById("recipe-name").value = recipe.recipe_name;
                    document.getElementById("cuisine-type").value = recipe.cuisine_type;
                    document.getElementById("preparation-time").value = recipe.preparation_time.split(" ")[0];
                    document.getElementById("difficulty").value = recipe.difficulty_level;
                    document.getElementById("recipe-steps").value = recipe.steps;
                })
                .catch(error => console.error("Error al obtener la receta:", error));
        } else {
            // Limpiar los campos si no hay receta seleccionada
            document.getElementById("recipe-name").value = "";
            document.getElementById("cuisine-type").value = "";
            document.getElementById("preparation-time").value = "";
            document.getElementById("difficulty").value = "1"; // Valor por defecto
            document.getElementById("recipe-steps").value = "";
        }
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