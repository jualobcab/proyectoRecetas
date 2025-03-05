// Mostrar el formulario de edición cuando se hace clic en "Modificar"
document.getElementById("btnModificar").addEventListener("click", function () {
  document.getElementById("listadoRecetas").style.display = "none";
  document.getElementById("recipeEdit").style.display = "block";
});

// Cargar una receta en el formulario de edición (GET)
async function loadRecipeForEdit(recipeId) {
  try {
    const response = await fetch(`/recipe/${recipeId}`);

    const recipe = await response.json();

    if (response.ok) {
      document.getElementById("edit_recipe_id").value = recipeId;
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

// Editar receta (PUT)
document
  .getElementById("editRecipeForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!validarEditarReceta()) {
      return;
    }
    const recipeId = document.getElementById("edit_recipe_id").value;
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
        document.getElementById("btnlistado").click();
        document.getElementById("recipeEdit").style.display = "none";
        document.getElementById("listadoRecetas").style.display = "block";
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error al actualizar la receta:", error);
      showDialog("Hubo un problema al actualizar la receta.");
    }
  });

document.getElementById("clearEditButton").addEventListener("click", limpiarEditarCampos);

// Limpiar los campos del formulario de edición
function limpiarEditarCampos() {
  document.getElementById("edit_recipe_id").value = "";
  document.getElementById("edit_recipe_name").value = "";
  document.getElementById("edit_cuisine_type").value = "";
  document.getElementById("edit_difficulty_level").value = "";
  document.getElementById("edit_preparation_time").value = "";
  document.getElementById("edit_steps").value = "";
}

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
