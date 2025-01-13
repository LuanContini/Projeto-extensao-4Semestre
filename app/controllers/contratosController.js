const dbConnection = require("../../config/dbConnection");

const { getContratos, getContratoById, adicionarContrato } = require("../models/contratosModel");

module.exports.getContratos = async (req, res) => {
  
  try{
    const dbConn = await dbConnection();

    const contratos = await getContratos(dbConn);

    res.status(200).send({ 'Contratos': contratos});
  }catch(err){
    res.status(400).send({ 'err': err});
  }
};

module.exports.getContratoById = async (req, res) => {
  
  const idContrato = req.params.id;

  try{
    const dbConn = await dbConnection();

    const contrato = await getContratoById(dbConn, idContrato);

    res.status(200).send({ 'contrato': contrato});
  }catch (err) {
    res.status(400).send({ 'err': err});
  }
};

module.exports.postContrato = (req, res) => {
  const { tipo, localEven, cep, apelido, idUsuario, idContratante } = req.body;

    const dbConn = await dbConnection();

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

