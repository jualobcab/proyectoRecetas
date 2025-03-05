function showDialog(message) {
  // Verificar si ya existe un diálogo en el documento y eliminarlo
  const existingDialog = document.getElementById("customDialog");
  if (existingDialog) {
    existingDialog.remove();
  }

  // Crear el contenedor del fondo (overlay)
  const dialogBackdrop = document.createElement("div");
  dialogBackdrop.id = "customDialogBackdrop";
  dialogBackdrop.classList.add(
    "fixed", 
    "top-0", 
    "left-0", 
    "w-full", 
    "h-full", 
    "bg-gray-800", 
    "bg-opacity-50", 
    "flex", 
    "items-center", 
    "justify-center", 
    "z-50"
  );

  // Crear el cuadro de diálogo
  const dialogBox = document.createElement("div");
  dialogBox.classList.add("bg-white", "p-6", "rounded-lg", "shadow-lg", "w-96", "text-center");

  // Agregar el mensaje al cuadro de diálogo
  const messageText = document.createElement("p");
  messageText.classList.add("text-lg", "font-semibold", "text-gray-700", "mb-4");
  messageText.textContent = message;

  // Crear el botón de cerrar
  const closeButton = document.createElement("button");
  closeButton.id = "closeDialog";
  closeButton.classList.add(
    "bg-blue-500", 
    "text-white", 
    "px-6", 
    "py-2", 
    "rounded-md", 
    "hover:bg-blue-600", 
    "focus:outline-none", 
    "focus:ring-2", 
    "focus:ring-blue-300"
  );
  closeButton.textContent = "Cerrar";

  // Agregar el mensaje y el botón al cuadro de diálogo
  dialogBox.appendChild(messageText);
  dialogBox.appendChild(closeButton);

  // Agregar el cuadro de diálogo al contenedor del fondo
  dialogBackdrop.appendChild(dialogBox);

  // Agregar el contenedor al body
  document.body.appendChild(dialogBackdrop);

  // Mostrar el diálogo (no es estrictamente necesario, pero así lo tenemos claro)
  dialogBackdrop.style.display = "flex";

  // Evento para cerrar el diálogo cuando se hace clic en el botón
  closeButton.addEventListener("click", () => {
    dialogBackdrop.remove(); // Eliminar el diálogo del DOM después de cerrarlo
  });
}


function validarCrearReceta() {
  limpiarErrores();

  let valido = true;

  
  let recipe_name = document.getElementById("recipe_name").value.trim();
  let cuisine_type = document.getElementById("cuisine_type").value.trim();
  let  difficulty_level = document.getElementById("difficulty_level").value.trim();
  let preparation_time = document.getElementById("preparation_time").value.trim();
  let steps = document.getElementById("steps").value.trim();
 

  const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

  // Validación Nombre de la receta
  if (!recipe_name) {
    mostrarError("recipe_name", "El nombre es obligatorio");
    valido = false;
  } else if (!nameRegex.test(recipe_name)) {
    mostrarError("recipe_name", "Solo se permiten letras y espacios");
    valido = false;
  }

  // Validación Tipo de cocina (opcional, pero si está presente debe ser válido)
  if (cuisine_type && !nameRegex.test(cuisine_type)) {
    mostrarError("cuisine_type", "Solo se permiten letras y espacios");
    valido = false;
  }

  // Validación Nivel de dificultad
  const difficulty = parseInt(difficulty_level);
  if (!difficulty_level) {
    mostrarError("difficulty_level", "El nivel de dificultad es obligatorio");
    valido = false;
  } else if (isNaN(difficulty) || difficulty < 1 || difficulty > 5) {
    mostrarError("difficulty_level", "Debe ser un número entre 1 y 5");
    valido = false;
  }

  // Validación Tiempo de preparación (opcional, pero si se ingresa debe ser mayor que 0)
  if (preparation_time && (isNaN(preparation_time) || preparation_time <= 0)) {
    mostrarError("preparation_time", "Debe ser un número mayor que 0");
    valido = false;
  }

  // Validación Pasos de la receta
  if (!steps) {
    mostrarError("steps", "Los pasos son obligatorios");
    valido = false;
  }

  return valido;
}

function mostrarError(campo, mensaje) {
 
  // Obtener el input
  const inputField = document.getElementById(campo);

  // Revisar si ya hay un mensaje de error existente y eliminarlo
  const existingError = inputField.nextElementSibling;
  if (existingError && existingError.classList.contains("error-message")) {
    existingError.remove();
  }

  // Crear el div del mensaje de error
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("error-message");
  errorDiv.textContent = mensaje;
  errorDiv.style.color = "red";
  errorDiv.style.fontSize = "0.9em";
  errorDiv.style.marginTop = "5px";

  // Insertar el mensaje después del input
  inputField.after(errorDiv);
  console.log(inputField);
}

function limpiarErrores() {
  document
    .querySelectorAll(".error-message")
    .forEach((error) => error.remove());
}

function clearContent() {
  const contentContainer = document.getElementById("content");
  
  // Eliminar todos los elementos hijos dentro de #content
  while (contentContainer.firstChild) {
    contentContainer.removeChild(contentContainer.firstChild);
  }
}
