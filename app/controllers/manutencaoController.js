const dbConnection = require("../../config/dbConnection");

const { getManutencao } = require("../models/manutencaoModel");

module.exports.manutencao = (app, req, res) => {
  const dbConn = dbConnection();

  getManutencao(dbConn, (error, itens) => {
    if (error) {
      console.log("erro ", error.message);
    }
    console.log(itens);
    res.render("manutencaoView.ejs", { itensManutencao: itens });
  });
};
