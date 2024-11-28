const dbConnection = require("../../config/dbConnection");

const { getClientes, adicionarCliente } = require("../models/clientesModel");

module.exports.getClientes = async (req, res) => {
  try{
  const dbConn = dbConnection();
  
  const clientes = await getClientes(dbConn);

    res.status(200).send({ 'clientes': clientes });
}catch (err){
  res.status(400).send({'err': err});
}
};
 
module.exports.getClienteById = (req, res) => {
  //TODO GET CLIENTE POR ID ESPECIFICO
};

module.exports.postCliente = async (req, res) => {
  const { nome, cpf, telefone, email } = req.params;

  try{
    const dbConn = dbConnection();

    const post = adicionarCliente(dbConn, nome, cpf, telefone, email);

    res.status(200).send({'post': post});
}catch (err){
  res.status(400).send({'err': err});
}
};

module.exports.putCliente = (req, res) => {
  //TODO ATUALIZAR CLIENTE 
};

module.exports.deleteCliente = (req, res) => {
  //TODO DELETAR CLIENTE A PARTIR DE ID
};
