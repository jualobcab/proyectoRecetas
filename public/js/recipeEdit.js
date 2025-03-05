function validarEditarReceta() {
  limpiarErrores();

  let valido = true;

  let recipe_name = document.getElementById("edit_recipe_name").value.trim();
  let cuisine_type = document.getElementById("edit_cuisine_type").value.trim();
  let difficulty_level = document
    .getElementById("edit_difficulty_level")
    .value.trim();
  let preparation_time = document
    .getElementById("edit_preparation_time")
    .value.trim();
  let steps = document.getElementById("edit_steps").value.trim();

  const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

  // Validación Nombre de la receta
  if (!recipe_name) {
    mostrarError("edit_recipe_name", "El nombre es obligatorio");
    valido = false;
  } else if (!nameRegex.test(recipe_name)) {
    mostrarError("edit_recipe_name", "Solo se permiten letras y espacios");
    valido = false;
  }

  // Validación Tipo de cocina (opcional, pero si está presente debe ser válido)
  if (cuisine_type && !nameRegex.test(cuisine_type)) {
    mostrarError("edit_cuisine_type", "Solo se permiten letras y espacios");
    valido = false;
  }

  // Validación Nivel de dificultad
  const difficulty = parseInt(difficulty_level);
  if (!difficulty_level) {
    mostrarError(
      "edit_difficulty_level",
      "El nivel de dificultad es obligatorio"
    );
    valido = false;
  } else if (isNaN(difficulty) || difficulty < 1 || difficulty > 5) {
    mostrarError("edit_difficulty_level", "Debe ser un número entre 1 y 5");
    valido = false;
  }

  // Validación Tiempo de preparación (opcional, pero si se ingresa debe ser mayor que 0)
  if (preparation_time && (isNaN(preparation_time) || preparation_time <= 0)) {
    mostrarError("edit_preparation_time", "Debe ser un número mayor que 0");
    valido = false;
  }

  // Validación Pasos de la receta
  if (!steps) {
    mostrarError("edit_steps", "Los pasos son obligatorios");
    valido = false;
  }

  return valido;
}
function showEditar(recipeId) {
  clearContent();

  // Eliminar cualquier formulario existente antes de crear uno nuevo
  const existingForm = document.getElementById("editRecipeForm");
  if (existingForm) {
    existingForm.remove();
  }

  // Crear un nuevo formulario dinámicamente para editar
  const editRecipeForm = document.createElement("form");
  editRecipeForm.id = "editRecipeForm";
  editRecipeForm.classList.add("space-y-4", "p-6", "max-w-2xl", "mx-auto", "bg-white", "rounded-lg", "shadow-md"); // Estilos del formulario

  // Crear el título
  const title = document.createElement("h2");
  title.textContent = "Editar Receta";
  title.classList.add("text-2xl", "font-semibold", "text-center", "mb-4"); // Estilos del título
  editRecipeForm.appendChild(title);

  // Crear el campo de nombre de receta
  const nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", "edit_recipe_name");
  nameLabel.textContent = "Nombre de la receta:";
  nameLabel.classList.add("block", "font-medium", "text-gray-700"); // Estilos de la etiqueta
  editRecipeForm.appendChild(nameLabel);
  const nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("id", "edit_recipe_name");
  nameInput.setAttribute("name", "recipe_name");
  nameInput.required = true;
  nameInput.classList.add("w-full", "px-4", "py-2", "border", "border-gray-300", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-blue-400", "focus:border-blue-400"); // Estilos del input
  editRecipeForm.appendChild(nameInput);

  // Crear el campo de tipo de cocina
  const typeLabel = document.createElement("label");
  typeLabel.setAttribute("for", "edit_cuisine_type");
  typeLabel.textContent = "Tipo de cocina:";
  typeLabel.classList.add("block", "font-medium", "text-gray-700");
  editRecipeForm.appendChild(typeLabel);
  const typeInput = document.createElement("input");
  typeInput.setAttribute("type", "text");
  typeInput.setAttribute("id", "edit_cuisine_type");
  typeInput.setAttribute("name", "cuisine_type");
  typeInput.classList.add("w-full", "px-4", "py-2", "border", "border-gray-300", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-blue-400", "focus:border-blue-400");
  editRecipeForm.appendChild(typeInput);

  // Crear el campo de nivel de dificultad
  const difficultyLabel = document.createElement("label");
  difficultyLabel.setAttribute("for", "edit_difficulty_level");
  difficultyLabel.textContent = "Nivel de dificultad (1-5):";
  difficultyLabel.classList.add("block", "font-medium", "text-gray-700");
  editRecipeForm.appendChild(difficultyLabel);
  const difficultyInput = document.createElement("input");
  difficultyInput.setAttribute("type", "number");
  difficultyInput.setAttribute("id", "edit_difficulty_level");
  difficultyInput.setAttribute("name", "difficulty_level");
  difficultyInput.setAttribute("min", "1");
  difficultyInput.setAttribute("max", "5");
  difficultyInput.classList.add("w-full", "px-4", "py-2", "border", "border-gray-300", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-blue-400", "focus:border-blue-400");
  editRecipeForm.appendChild(difficultyInput);

  // Crear el campo de tiempo de preparación
  const timeLabel = document.createElement("label");
  timeLabel.setAttribute("for", "edit_preparation_time");
  timeLabel.textContent = "Tiempo de preparación (minutos):";
  timeLabel.classList.add("block", "font-medium", "text-gray-700");
  editRecipeForm.appendChild(timeLabel);
  const timeInput = document.createElement("input");
  timeInput.setAttribute("type", "number");
  timeInput.setAttribute("id", "edit_preparation_time");
  timeInput.setAttribute("name", "preparation_time");
  timeInput.classList.add("w-full", "px-4", "py-2", "border", "border-gray-300", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-blue-400", "focus:border-blue-400");
  editRecipeForm.appendChild(timeInput);

  // Crear el campo de pasos
  const stepsLabel = document.createElement("label");
  stepsLabel.setAttribute("for", "edit_steps");
  stepsLabel.textContent = "Pasos de la receta:";
  stepsLabel.classList.add("block", "font-medium", "text-gray-700");
  editRecipeForm.appendChild(stepsLabel);
  const stepsTextarea = document.createElement("textarea");
  stepsTextarea.setAttribute("id", "edit_steps");
  stepsTextarea.setAttribute("name", "steps");
  stepsTextarea.setAttribute("rows", "4");
  stepsTextarea.setAttribute("cols", "50");
  stepsTextarea.classList.add("w-full", "px-4", "py-2", "border", "border-gray-300", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-blue-400", "focus:border-blue-400");
  editRecipeForm.appendChild(stepsTextarea);

  // Crear los botones de limpiar y enviar
  const clearButton = document.createElement("button");
  clearButton.setAttribute("type", "button");
  clearButton.setAttribute("id", "clearEditButton");
  clearButton.textContent = "Limpiar campos";
  clearButton.classList.add("bg-gray-300", "text-gray-700", "hover:bg-gray-400", "px-4", "py-2", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-gray-500"); // Estilos del botón limpiar
  editRecipeForm.appendChild(clearButton);

  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.textContent = "Actualizar receta";
  submitButton.classList.add("bg-blue-500", "text-white", "hover:bg-blue-700", "px-6", "py-2", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-blue-400"); // Estilos del botón de envío
  editRecipeForm.appendChild(submitButton);

  // Agregar el formulario al contenedor del contenido
  const contentContainer = document.getElementById("content");
  contentContainer.appendChild(editRecipeForm);

  // Cargar los datos de la receta para editar
  loadRecipeForEdit(recipeId);

  // Configurar el evento de submit
  editRecipeForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto

    if (!validarEditarReceta()) {
      return;
    }

    const updatedRecipeData = {
      recipe_name: document.getElementById("edit_recipe_name").value,
      cuisine_type: document.getElementById("edit_cuisine_type").value,
      difficulty_level: document.getElementById("edit_difficulty_level").value,
      preparation_time: document.getElementById("edit_preparation_time").value,
      steps: document.getElementById("edit_steps").value,
    };

    try {
      const response = await fetch(`/recipe/update/${recipeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRecipeData),
      });

      const data = await response.json();
      if (response.ok) {
        showDialog("Receta actualizada correctamente");
        cargarRecetas();
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error al actualizar la receta:", error);
      showDialog("Hubo un problema al actualizar la receta.");
    }
  });

  // Configurar el botón "Limpiar campos"
  document.getElementById("clearEditButton").addEventListener("click", () => {
    editRecipeForm.reset();
  });
}



async function loadRecipeForEdit(recipeId) {
  try {
    const response = await fetch(`/recipe/${recipeId}`);

    const recipe = await response.json();

    if (response.ok) {
      document.getElementById("edit_recipe_name").value = recipe.recipe_name;
      document.getElementById("edit_cuisine_type").value = recipe.cuisine_type;
      document.getElementById("edit_difficulty_level").value =
        recipe.difficulty_level;
      document.getElementById("edit_preparation_time").value =
        recipe.preparation_time;
      document.getElementById("edit_steps").value = recipe.steps;
    } else {
      showDialog("Error al cargar la receta: " + recipe.message);
    }
  } catch (error) {
    console.error("Error al cargar la receta:", error);
    showDialog("Hubo un problema al obtener la receta.");
  }
}

async function cargarRecetasParaSeleccionar() {
  try {
    clearContent();
    const response = await fetch('/recipe/list'); 
    const recipes = await response.json();

    if (response.ok) {
      const select = document.createElement("select");
      select.setAttribute("id", "recipeSelect");
      select.setAttribute("name", "recipe");

      const defaultOption = document.createElement("option");
      defaultOption.textContent = "Selecciona una receta";
      select.appendChild(defaultOption);
 
      // Crear las opciones para cada receta
      recipes.forEach(recipe => {
        const option = document.createElement("option");
        option.value = recipe.recipe_id; // Usamos el id de la receta para seleccionarla
        option.textContent = recipe.recipe_name; // Mostramos el nombre de la receta
        select.appendChild(option);
      });

      // Crear el contenedor y añadir el select
      const contentContainer = document.getElementById("content");
      contentContainer.innerHTML = ''; // Limpiar el contenido previo
      const label = document.createElement("label");
      label.setAttribute("for", "recipeSelect");
      label.textContent = "Selecciona una receta para editar:";
      contentContainer.appendChild(label);
      contentContainer.appendChild(select);

      // Configurar el evento para seleccionar una receta
      select.addEventListener("change", (event) => {
        const recipeId = event.target.value;
      
        if (recipeId) {
          showEditar(recipeId); // Llamamos a la función showEditar con el id de la receta seleccionada
        }
      });
    } else {
      alert("Error al cargar las recetas.");
    }
  } catch (error) {
    console.error("Error al obtener las recetas:", error);
    alert("Hubo un problema al obtener las recetas.");
  }
}

document
  .getElementById("btnModificar")
  .addEventListener("click", cargarRecetasParaSeleccionar);
