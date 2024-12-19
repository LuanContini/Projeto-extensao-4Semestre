const dbConnection = require("../../config/dbConnection");

const {
  getClientes,
  getClienteById, 
  adicionarCliente,
  adicionarPessoaFisica,
  adicionarPessoaJuridica,
  deleteCliente,
  putCliente,
  atualizarPessoaFisica,
  atualizarPessoaJuridica,
} = require("../models/clientesModel");

//GET CLIENTE
module.exports.getClientes = async (req, res) => {
  try {
    const dbConn = dbConnection();

    const clientes = await getClientes(dbConn);

    res.status(200).send({ "clientes": clientes });
  } catch (err) {
    res.status(400).send({ "err": err });
  }
};

//GET CLIENTE BY ID
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

//INSERT CLIENTE
module.exports.postCliente = async (req, res) => {
  const { nome, telefone, email, observacao, tipo, cpf, cnpj } = req.params;

  try {
    const dbConn = dbConnection();

    const idCliente = await adicionarCliente(dbConn, nome, telefone, email, observacao);

    if (tipo === 'fisica' && cpf) {
      await adicionarPessoaFisica(dbConn, idCliente, cpf);
    } else if (tipo === 'juridica' && cnpj) {
      await adicionarPessoaJuridica(dbConn, idCliente, cnpj);
    } else {
      return res.status(400).send({ error: 'Tipo inválido ou dados incompletos' });
    }

    res.status(201).send({ message: 'Cliente adicionado com sucesso!', idCliente });
  } catch (err) {
    res.status(500).send({ error: 'Erro ao adicionar cliente', details: err.message });
  }
};

//UPDATE CLIENTE
module.exports.putCliente = async (req, res) => {
  const idCliente = req.params.idCliente;
  const { nome, email, telefone, imagem, observacao, tipo, cpf, cnpj } = req.params;

  try {
    const dbConn = dbConnection();

    await putCliente(dbConn, idCliente, nome, telefone, imagem, email, observacao);

    if (tipo === 'fisica' && cpf) {
      await atualizarPessoaFisica(dbConn, idCliente, cpf);
    } else if (tipo === 'juridica' && cnpj) {
      await atualizarPessoaJuridica(dbConn, idCliente, cnpj);
    } else {
      return res.status(400).send({ error: 'Tipo inválido ou dados incompletos' });
    }

    res.status(200).send({ message: 'Cliente atualizado com sucesso!' });
  } catch (err) {
    res.status(500).send({ error: 'Erro ao atualizar cliente', details: err.message });
  }
};

//DELETE CLIENTE
module.exports.deleteCliente = async (req, res) => {
  const idCliente = req.params.id;

  try {
    const dbConn = dbConnection();

    const deletar = await deleteCliente(dbConn, idCliente,);

    res.status(200).send({ "delete": deletar });
  } catch (err) {
    res.status(400).send({ "err": err });
  }
};
