


document.getElementById("btnlistado").addEventListener("click", async () => {
  try {
   
    const response = await fetch("/recipe/list"); // Hacer la petición al servidor
    const recipes = await response.json(); // Convertir la respuesta en JSON

    // Obtener el contenedor donde se mostrará la tabla
    const listadoContainer = document.getElementById("listadoRecetas");
    const addRecipeForm = document.getElementById("recipeForm");
    addRecipeForm.style.display = "none"; // Lo oculta
    listadoContainer.style.display = "block"; // Lo hace visible

    // Limpiar el contenido anterior
    listadoContainer.innerHTML = "";

    // Crear la tabla
    const table = document.createElement("table");
    table.setAttribute("border", "1"); // Añadir borde a la tabla

    // Crear encabezado de la tabla
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    const headers = ["ID", "Nombre", "Tipo", "Dificultad", "Tiempo", "Pasos", "Acciones"];
    headers.forEach((headerText) => {
      const th = document.createElement("th");
      th.textContent = headerText;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Crear el cuerpo de la tabla
    const tbody = document.createElement("tbody");

    recipes.forEach((recipe) => {
      const row = document.createElement("tr");

      const tdId = document.createElement("td");
      tdId.textContent = recipe.recipe_id;
      row.appendChild(tdId);

      const tdName = document.createElement("td");
      tdName.textContent = recipe.recipe_name;
      row.appendChild(tdName);

      const tdType = document.createElement("td");
      tdType.textContent = recipe.cuisine_type;
      row.appendChild(tdType);

      const tdDifficulty = document.createElement("td");
      tdDifficulty.textContent = recipe.difficulty_level;
      row.appendChild(tdDifficulty);

      const tdTime = document.createElement("td");
      tdTime.textContent = recipe.preparation_time;
      row.appendChild(tdTime);

      const tdSteps = document.createElement("td");
      tdSteps.textContent = recipe.steps;
      row.appendChild(tdSteps);

      // Crear la celda de acciones con botones de eliminar y modificar
      const tdActions = document.createElement("td");

      // Crear el botón de eliminar
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.addEventListener("click", async () => {
        try {
          const response = await fetch(`/recipe/delete/${recipe.recipe_id}`, {
            method: 'DELETE'
          });

          if (response.ok) {
            showDialog("Receta eliminada exitosamente");
            // Volver a cargar el listado de recetas después de eliminar
            document.getElementById("btnlistado").click();
          } else {
            showDialog("Error al eliminar la receta");
          
          }
        } catch (error) {
          console.error("Error al eliminar la receta:", error);
          showDialog("Hubo un problema al eliminar la receta");
        }
      });

      tdActions.appendChild(deleteButton);

      // Crear el botón de modificar
      const editButton = document.createElement("button");
      editButton.textContent = "Modificar";
    
      editButton.onclick = function () {
        loadRecipeForEdit(recipe.recipe_id);
        document.getElementById("listadoRecetas").style.display = "none";
        document.getElementById("recipeEdit").style.display = "block"; 
        
      };

      tdActions.appendChild(editButton);
      row.appendChild(tdActions);

      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    listadoContainer.appendChild(table); // Insertar la tabla en el contenedor
  } catch (error) {
    console.error("Error al obtener las recetas:", error);
    showDialog("Hubo un problema al cargar el listado");
    
  }
});

document.getElementById("btnlistado").click();