const dbConnection = require("../../config/dbConnection");

const {
  getItens,
  getItensById,
  adicionarItem,
  updateItem,
  deleteItem,
} = require("../models/itensModel");

// GET all items
module.exports.getItens = async (req, res) => {
  try {
    const dbConn = dbConnection();
    const itens = await getItens(dbConn);
    res.status(200).send({ itens });
  } catch (err) {
    res.status(403).send({ erro: err.message });
  }
};

// GET item by ID
module.exports.getItensById = async (req, res) => {
  const dbConn = dbConnection();
  const idItem = req.params.id;

  try {
    const item = await getItensById(dbConn, idItem);
    res.status(200).send({ item });
  } catch (err) {
    res.status(403).send({ erro: err.message });
  }
};

// POST new item
module.exports.postItem = async (req, res) => {
  const { cod_barras, nome, categoria, preco_loca } = req.body; // body ao invés de params para POST

  const dbConn = dbConnection();

  try {
    const post = await adicionarItem(dbConn, cod_barras, nome, categoria, preco_loca);
    res.status(200).send({ result: post });
  } catch (err) {
    res.status(400).send({ erro: err.message });
  }
};

// UPDATE item
module.exports.putItem = async (req, res) => {
  const { nome, categoria, preco_loca, idGrupo } = req.params; 

  const dbConn = dbConnection();

  try {
    const result = await updateItem(dbConn, nome, categoria, preco_loca, idGrupo);
    res.status(200).send({ result });
  } catch (err) {
    res.status(400).send({ erro: err.message });
  }
};

// DELETE item
module.exports.deleteItem = async (req, res) => {
  const idItem = req.params.id;

  const dbConn = dbConnection();

  try {
    const result = await deleteItem(dbConn, idItem);

    if (result.affectedRows > 0) {
      res.status(200).send({ result });
    } else {
      res.status(400).send({ erro: "O item não foi apagado" });
    }
  } catch (err) {
    res.status(400).send({ erro: err.message });
  }
};
