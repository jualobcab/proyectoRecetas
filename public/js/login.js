document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();
  
    const usernameOrEmail = document.getElementById("usernameOrEmail").value;
    const password = document.getElementById("password").value;

   
  
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usernameOrEmail, password }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        window.location.href = "/principal";
      } else {
        showDialog("El usuario y la contraseña son incorrectos");
      }
    } catch (error) {
     
    }
  });