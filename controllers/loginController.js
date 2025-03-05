const path = require("path");
const { Sequelize } = require("sequelize");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getView = (req, res) => {
  if (req.session.user) {
    return res.redirect("/principal");
  } else {
    res.sendFile(path.join(__dirname, "../views/login.html"));
  }
};

exports.postLogin = async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        [Sequelize.Op.or]: [
          { username: usernameOrEmail },
          { email: usernameOrEmail }
        ]
      }
    });

    if (!user) {
      return res.json({ success: false, message: "Usuario o contraseña incorrectos." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Usuario o contraseña incorrectos." });
    }

    req.session.user = user.username;
    return res.json({ success: true, redirect: "/principal" });

  } catch (error) {
    console.error("Error en el login:", error);
    return res.status(500).json({ success: false, message: "Error en la base de datos." });
  }
};
