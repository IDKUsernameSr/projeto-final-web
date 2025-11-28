const { sequelize } = require("../config/db");

exports.index = async (req, res) => {
  let dbOk = true; // status do banco
  try {
    await sequelize.authenticate(); // testa conexao
  } catch {
    dbOk = false; // erro na conexao
  }
  res.render("pages/home", { title: "Locadora — Home", dbOk }); // envia status para a view
};
