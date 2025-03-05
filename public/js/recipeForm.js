
document
  .getElementById("recipeForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!validarCrearReceta()) {
      return; 
    }

    const recipeData = {
      recipe_name: document.getElementById("recipe_name").value,
      cuisine_type: document.getElementById("cuisine_type").value,
      difficulty_level: document.getElementById("difficulty_level").value,
      preparation_time: document.getElementById("preparation_time").value,
      steps: document.getElementById("steps").value,
    };

    try {
      const response = await fetch("/recipe/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      const data = await response.json();
      if (response.ok) {
        limpiarCrearCampos();
        document.getElementById("btnlistado").click();
        showDialog("Receta agregada exitosamente");
    
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error al enviar la receta:", error);
      showDialog("Hubo un problema con la solicitud");
   
    }
  });

document.getElementById("btnAgregar").addEventListener("click", function () {
  const listadoRecetas = document.getElementById("listadoRecetas");
  const form = document.getElementById("recipeForm");
  const edit = document.getElementById("recipeEdit");
  edit.style.display = "none";
  listadoRecetas.style.display = "none";
  form.style.display= "block";

});

document.getElementById('clearCrearButton').addEventListener('click', limpiarCrearCampos);

function limpiarCrearCampos() {
    // Limpiar los valores de los campos del formulario
    document.getElementById('recipe_name').value = '';
    document.getElementById('cuisine_type').value = '';
    document.getElementById('difficulty_level').value = '';
    document.getElementById('preparation_time').value = '';
    document.getElementById('steps').value = '';
}

