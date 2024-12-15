const dbConnection = require("../../config/dbConnection");

const {
  getClientes,
  getClienteById, 
  adicionarCliente,
  deleteCliente,
  putCliente,
} = require("../models/clientesModel");

module.exports.getClientes = async (req, res) => {
  try {
    const dbConn = dbConnection();

    const clientes = await getClientes(dbConn);

    res.status(200).send({ "clientes": clientes });
  } catch (err) {
    res.status(400).send({ "err": err });
  }
};

module.exports.getClienteById = async (req, res) => {
  const idCliente = req.params.id;

  try {
    const dbConn = dbConnection();

    const cliente = await getClienteById(dbConn, idCliente);

    res.status(200).send({ "cliente": cliente });
  } catch (err) {
    res.status(400).send({ "err": err });
  }
};

module.exports.postCliente = async (req, res) => {
  const { nome, cpf, telefone, email } = req.params;

  try {
    const dbConn = dbConnection();

    const post = adicionarCliente(dbConn, nome, cpf, telefone, email);

    res.status(200).send({ "post": post });
  } catch (err) {
    res.status(400).send({ "err": err });
  }
};

module.exports.putCliente = async (req, res) => {
  const { id, nome, cpf, telefone, email } = req.params;

  try {
    const dbConn = dbConnection();

    const update = await putCliente(dbConn, id, nome, cpf, telefone, email);

    res.status(200).send({ "update": update });
  } catch (err) {
    res.status(400).send({ "err": err });
  }
};

module.exports.deleteCliente = async (req, res) => {
  const idCliente = req.params.id;

  try {
    const dbConn = dbConnection();

    const deletar = await deleteCliente(dbConn, idCliente);

    res.status(200).send({ "delete": deletar });
  } catch (err) {
    res.status(400).send({ "err": err });
  }
};
