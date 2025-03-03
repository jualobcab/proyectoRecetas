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
  const { username, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.send("Este usuario ya está registrado.");
    }

    // Hashear la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    await User.create({ username, password: hashedPassword });
    req.session.user = username;

    return res.redirect("/principal");
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).send("Error en el servidor");
  }
};
