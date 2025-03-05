document.getElementById("registerForm").addEventListener("submit", async function(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Validar los datos
  const validationError = validateForm(email, username, password);
  if (validationError) {
    
      showDialog(validationError);
      return; 
  }

  try {
      const response = await fetch("/registro", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();

      if (data.success) {
          // Redirigir a la página principal si el registro es exitoso
          window.location.href = "/principal";
      } else {
          // Si el servidor responde con un error
          showDialog(data.message);
      }
  } catch (error) {
      console.error("Error en el registro", error);
      showDialog("Error en el servidor, intenta más tarde.");
  }
});



function validateForm(email, username, password) {
  // Validación de correo electrónico
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailPattern.test(email)) {
      return "El correo electrónico no es válido.";
  }

  // Validación de nombre de usuario (al menos 3 caracteres)
  if (username.length < 3) {
      return "El nombre de usuario debe tener al menos 3 caracteres.";
  }

  // Validación de la contraseña (mínimo 6 caracteres)
  if (password.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres.";
  }

  // Si todo está bien, retorna null (sin errores)
  return null;
}