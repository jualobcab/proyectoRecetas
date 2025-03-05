document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");

    if (loginBtn) {
        loginBtn.addEventListener("click", (event) => {
            event.preventDefault();

            const usuario = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            if (!validarCamposLogin(usuario, password)) {
                return;
            }

            let datos = {
                username: usuario,
                password: password
            }

            fetch('/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datos),
            })
                .then(response => response.json())
                .then(respuesta => { 
                    if (respuesta.error){
                        showAlertToast(respuesta.error)
                    }
                    else {
                        showToast(respuesta.message)
                        location.href = "/recetas"
                    }
                }).catch((err) => {
                    showAlertToast('Error al iniciar sesion: ' + err.error);
                });
            }
        );
    }

    if (registerBtn) {
        registerBtn.addEventListener("click", (event) => {
            event.preventDefault();

            const usuario = document.getElementById("username").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (!validarCamposRegister(usuario, password, email)) {
                return;
            }

            let datos = {
                username: usuario,
                password: password,
                email: email
            }

            fetch('/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datos),
            })
                .then(response => response.json())
                .then(respuesta => { 
                    if (respuesta.error){
                        showAlertToast(respuesta.error)
                    }
                    else {
                        showToast(respuesta.message)
                        location.href = "/recetas"
                    }
                }).catch((err) => {
                    showAlertToast('Error al iniciar sesion: ' + err.error);
                });
            }
        );
    }

    function validarCamposLogin(usuario, contrasenna) {
        let ok = true;
        let mensajeError = "";
    
        let validarNombre = validateUsername(usuario);
        let validarContrasenna = validatePassword(contrasenna);
    
        if (validarNombre !== ""){
            mensajeError += validarNombre+"\n";
        }
        if (validarContrasenna !== ""){
            mensajeError += validarContrasenna;
        }
    
        if (mensajeError !== ""){
            showAlertToast(mensajeError);
            ok = false;
        }
    
        return ok
    }
    function validarCamposRegister(usuario, contrasenna, email) {
        let ok = true;
        let mensajeError = "";
    
        let validarNombre = validateUsername(usuario);
        let validarContrasenna = validatePassword(contrasenna);
        let validarEmail = validateEmail(email);
    
        if (validarNombre !== ""){
            mensajeError += validarNombre+"\n";
        }
        if (validarContrasenna !== ""){
            mensajeError += validarContrasenna+"\n";
        }
        if (validarEmail !== ""){
            mensajeError += validarEmail;
        }
    
        if (mensajeError !== ""){
            showAlertToast(mensajeError);
            ok = false;
        }
    
        return ok
    }
});