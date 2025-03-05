// Validar Usuario
function validateUsername(username) {
    if (!username || username.length > 12) {
        return "El nombre de usuario no puede estar vacío y debe tener máximo 12 caracteres.";
    }
    return "";
}

// Validar Contraseña
function validatePassword(password) {
    if (!password || password.length < 6) {
        return "La contraseña no puede estar vacía y debe tener al menos 6 caracteres.";
    }
    return "";
}

// Validar Email
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email || !emailRegex.test(email)) {
        return "El email no puede estar vacío y debe tener un formato válido.";
    }
    return "";
}

// Validar Nombre de la receta
function validateRecipeName(name) {
    if (!name || name.length > 30) {
        return "El nombre de la receta no puede estar vacío y debe tener máximo 30 caracteres.";
    }
    return "";
}

// Validar Tipo de cocina
function validateCuisineType(type) {
    if (!type || type.length > 18) {
        return "El tipo de cocina no puede estar vacío y debe tener máximo 18 caracteres.";
    }
    return "";
}

// Validar Tiempo de preparación
function validatePreparationTime(time) {
    if (!time || isNaN(time) || time <= 0) {
        return "El tiempo de preparación debe ser un número positivo y no puede estar vacío.";
    }
    return "";
}

// Validar Dificultad
function validateDifficulty(difficulty) {
    if (!difficulty || isNaN(difficulty) || difficulty < 1 || difficulty > 5) {
        return "La dificultad debe ser un número entre 1 y 5 y no puede estar vacío.";
    }
    return "";
}

// Validar Pasos de preparación
function validateSteps(steps) {
    if (!steps || steps.trim() === "") {
        return "Los pasos de preparación no pueden estar vacíos.";
    }
    return "";
}