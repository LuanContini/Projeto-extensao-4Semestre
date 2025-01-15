const dbConnection = require("../../config/dbConnection");

const {
  getClientes,
  getClienteById,
  adicionarCliente,
  deleteCliente,
  putCliente,
} = require("../models/clientesModel");

//GET CLIENTE
module.exports.getClientes = async (req, res) => {
  try {
    const dbConn = await dbConnection();

    const clientes = await getClientes(dbConn);
    res.render("./telas_clientes/tela_clientes.ejs", {
      "clients": clientes,
      selectedClient: "", usuario: req.user
    });
  } catch (err) {
    res.status(400).send({ "err": err });
  }
};

//GET CLIENTE BY ID
module.exports.getClienteById = async (req, res) => {
  const idCliente = req.params.id;

  try {
    const dbConn = await dbConnection();

    const cliente = await getClienteById(dbConn, idCliente);

    res.status(200).send({ "cliente": cliente });
  } catch (err) {
    res.status(400).send({ "err": err });
  }
};

//INSERT CLIENTE
module.exports.postCliente = async (req, res) => {
  const { nome, telefone, email, observacao, imagem, cpf, cnpj} = req.body;

  try {
    const dbConn = await dbConnection();

    const idCliente = await adicionarCliente(
      dbConn,
      nome,
      telefone,
      email,
      observacao,
      imagem,
      cpf,
      cnpj
    );

    res
      .status(201)
      .send({ message: "Cliente adicionado com sucesso!", idCliente });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Erro ao adicionar cliente", details: err });
  }
};

//UPDATE CLIENTE
module.exports.putCliente = async (req, res) => {
  const idCliente = req.params.id; // ID do cliente a ser atualizado
  const { nome, telefone, email, observacao, imagem, cnpj, cpf} = req.body;

  
  try {
    const dbConn = await dbConnection(); // Conexão com o banco de dados

    // Atualiza os dados do cliente na tabela contratante
    await putCliente(
      dbConn,
      idCliente,
      nome,
      telefone,
      email,
      observacao,
      imagem,
      cpf,
      cnpj
    );

    res.status(200).send({ message: "Cliente atualizado com sucesso!" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ error: "Erro ao atualizar cliente", details: err.message });
  }
};

//DELETE CLIENTE
module.exports.deleteCliente = async (req, res) => {
  const idCliente = req.params.id;

  try {
    const dbConn = await dbConnection();

    const deletar = await deleteCliente(dbConn, idCliente);

    res.status(200).send({ "delete": deletar });
  } catch (err) {
    res.status(400).send({ "err": err });
  }
};
