const path = require("path");

exports.getView = (req, res) => {
  if (req.session.user) {
    res.sendFile(path.join(__dirname, "../views/principal.html"));
  } else {
    return res.redirect("/login");
  }
};


exports.getIndex = (req, res) => {
  if (req.session.user) {
    res.sendFile(path.join(__dirname, "../views/index.html"));
  } else {
    return res.redirect("/login");
  }
};