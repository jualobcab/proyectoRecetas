document
  .getElementById("recipeForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

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
        limpiarCampos();
        alert("Receta agregada exitosamente");
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error al enviar la receta:", error);
      alert("Hubo un problema con la solicitud.");
    }
  });

document.getElementById("btnAgregar").addEventListener("click", function () {
  const listadoRecetas = document.getElementById("listadoRecetas");
  const recipeForm = document.getElementById("recipeForm");
  listadoRecetas.style.display = "none";
  recipeForm.style.display= "block";

});

document.getElementById('clearButton').addEventListener('click', limpiarCampos);

function limpiarCampos() {
    // Limpiar los valores de los campos del formulario
    console.log("a");
    document.getElementById('recipe_name').value = '';
    document.getElementById('cuisine_type').value = '';
    document.getElementById('difficulty_level').value = '';
    document.getElementById('preparation_time').value = '';
    document.getElementById('steps').value = '';
}