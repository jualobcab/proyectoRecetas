function showToast(message) {
    // Crear el contenedor del toast
    const toast = document.createElement("div");
    toast.classList.add(
      "fixed",
      "bottom-5",
      "right-5",
      "bg-green-500",
      "text-white",
      "p-4",
      "rounded-lg",
      "shadow-lg",
      "w-80",
      "text-center",
      "transition-opacity",
      "opacity-0"
    );
  
    // Crear el mensaje del toast
    const messageText = document.createElement("p");
    messageText.classList.add("text-lg", "font-semibold");
    messageText.innerText = message;
  
    // Agregar el mensaje al contenedor del toast
    toast.appendChild(messageText);
  
    // Agregar el toast al body
    document.body.appendChild(toast);
  
    // Mostrar el toast (cambiar la opacidad a 1 para hacerlo visible)
    setTimeout(() => {
      toast.classList.remove("opacity-0");
      toast.classList.add("opacity-100");
    }, 100);
  
    // Desaparecer el toast después de 3 segundos (3000ms)
    setTimeout(() => {
      toast.classList.remove("opacity-100");
      toast.classList.add("opacity-0");
  
      // Eliminar el toast del DOM después de la animación
      setTimeout(() => {
        toast.remove();
      }, 500); // Espera un poco para que termine la animación de desvanecimiento
    }, 3000);
  }
  function showAlertToast(message) {
    // Crear el contenedor del toast
    const toast = document.createElement("div");
    toast.classList.add(
      "fixed",
      "bottom-5",
      "right-5",
      "bg-red-500",
      "text-white",
      "p-4",
      "rounded-lg",
      "shadow-lg",
      "w-80",
      "text-center",
      "transition-opacity",
      "opacity-0"
    );
  
    // Crear el mensaje del toast
    const messageText = document.createElement("p");
    messageText.classList.add("text-lg", "font-semibold");
    messageText.innerText = message;
  
    // Agregar el mensaje al contenedor del toast
    toast.appendChild(messageText);
  
    // Agregar el toast al body
    document.body.appendChild(toast);
  
    // Mostrar el toast (cambiar la opacidad a 1 para hacerlo visible)
    setTimeout(() => {
      toast.classList.remove("opacity-0");
      toast.classList.add("opacity-100");
    }, 100);
  
    // Desaparecer el toast después de 3 segundos (3000ms)
    setTimeout(() => {
      toast.classList.remove("opacity-100");
      toast.classList.add("opacity-0");
  
      // Eliminar el toast del DOM después de la animación
      setTimeout(() => {
        toast.remove();
      }, 500); // Espera un poco para que termine la animación de desvanecimiento
    }, 3000);
  }