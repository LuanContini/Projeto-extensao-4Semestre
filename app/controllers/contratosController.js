const dbConnection = require("../../config/dbConnection");

const { getContratos, adicionarContrato } = require("../models/contratosModel");

module.exports.getContratos = (req, res) => {
  const dbConn = dbConnection();

  getContratos(dbConn, (error, contratos) => {
    if (error) {
      console.log("erro ", error.message);
    }
    console.log(contratos);
    res.render("contratosView.ejs", { contratos: contratos });
  });
};

module.exports.getContratoById = (req, res) => {
  //TODO GET CONTRATOS POR ID ESPECIFICO
};

module.exports.postContrato = (req, res) => {
  const { tipo, localEven, cep, apelido, idUsuario, idContratante } = req.body;

    const dbConn = dbConnection();

    adicionarContrato(
      dbConn,
      tipo,
      localEven,
      cep,
      apelido,
      idUsuario,
      idContratante,
      (error, result) => {
        if (error) {
          console.log("Error, ", error.message);
        } else {
          console.log(result);
        }
        res.redirect("/contratos");
      }
    );
};

module.exports.putContrato = (req, res) => {
  //TODO EDITAR CONTRATOS
};

module.exports.deleteContrato = (req, res) => {
  //TODO EXCLUIR CONTRATOS
}

