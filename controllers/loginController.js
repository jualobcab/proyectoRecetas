const path = require("path");
const User = require("../models/user");
const bcrypt = require("bcryptjs"); // Usa bcryptjs si es necesario

exports.getView = (req, res) => {
  if (req.session.user) {
    return res.redirect("/principal");
  } else {
    res.sendFile(path.join(__dirname, "../views/login.html"));
  }
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscamos el usuario en la base de datos
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.send("Usuario o contraseña incorrectos.");
    }

    // Comparar la contraseña ingresada con la almacenada (hasheada)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.send("Usuario o contraseña incorrectos.");
    }

    req.session.user = user.username;

    return res.redirect("/principal");
  } catch (error) {
    console.error("Error en el login:", error);
    return res.status(500).send("Error en la base de datos.");
  }
};
