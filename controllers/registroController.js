const path = require("path");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getView = (req, res) => {
  if (req.session.user) {
    return res.redirect("/principal");
  } else {
    res.sendFile(path.join(__dirname, "../views/registro.html"));
  }
};

exports.postRegistro = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verificar si el correo ya está registrado
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.json({ success: false, message: "Este correo ya está registrado." });
    }

   
    // Hashear la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    await User.create({ username, email, password: hashedPassword });
    req.session.user = username;

    return res.json({ success: true, message: "Registro exitoso, redirigiendo..." });
  } catch (error) {
    console.error("Error en el registro:", error);
    return res.status(500).json({ success: false, message: "Error en el servidor." });
  }
};
