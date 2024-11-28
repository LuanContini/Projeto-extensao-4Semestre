const dbConnection = require("../../config/dbConnection");

const { getManutencao } = require("../models/manutencaoModel");

module.exports.getManutencao = (req, res) => {
  const dbConn = dbConnection();

  getManutencao(dbConn, (error, itens) => {
    if (error) {
      console.log("erro ", error.message);
    }
    console.log(itens);
    res.render("manutencaoView.ejs", { itensManutencao: itens });
  });
};

module.exports.getManutencaoById = (req, res) => {
  //TODO GET MANUTENÇÃO POR ID ESPECIFICO
};

module.exports.postManutencao = (req, res) => {
  //TODO ADICIONAR MANUTENÇÃO
}
module.exports.putManutencao = (req, res) => {
  //TODO EDITAR MANUTENÇÃO
};

module.exports.deleteManutencao = (req, res) => {
  //TODO EXCLUIR MANUTENÇÃO
};