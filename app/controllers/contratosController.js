const dbConnection = require("../../config/dbConnection");

const { getContratos, adicionarContrato } = require("../models/contratosModel");

module.exports.contratos = (app, req, res) => {
  const dbConn = dbConnection();

  getContratos(dbConn, (error, contratos) => {
    if (error) {
      console.log("erro ", error.message);
    }
    console.log(contratos);
    res.render("contratosView.ejs", { contratos: contratos });
  });
};

module.exports.adicionarContrato = (app, req, res) => {
  const { tipo, localEven, cep, apelido, idUsuario, idContratante } = req.body;

  const checaCampos =
    !tipo || !localEven || !cep || !apelido || !idUsuario || !idContratante;

  if (!checaCampos) {
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
  }
};
