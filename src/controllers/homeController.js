const { sequelize } = require("../config/db");

exports.index = async (req, res) => {
  let dbOk = true;
  try {
    await sequelize.authenticate();
  } catch {
    dbOk = false;
  }
  res.render("pages/home", { title: "Locadora — Início", dbOk });
};
