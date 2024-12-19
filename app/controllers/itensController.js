const dbConnection = require("../../config/dbConnection");

const {
  getItens,
  getItensById,
  adicionarItem,
  updateItem,
  deleteItem,
  getGrupos,
  getGrupoById,
} = require("../models/itensModel");

// GET all items
module.exports.getItens = async (req, res) => {
  try {
    const dbConn = dbConnection();
    const itens = await getItens(dbConn);
    const grupos = await getGrupos(dbConn);

    const itensComGrupos = grupos.map(grupo => ({
      ...grupo,
      itens: itens.filter(item => item.idGrupo === grupo.idGrupo)
    }));
    res.status(200).send({ 'itensComGrupos': itensComGrupos });
  } catch (err) {
    res.status(403).send({ 'erro:': err.message });
  }
};

// GET item by ID
module.exports.getGrupoById = async (req, res) => {
  const dbConn = dbConnection();
  const idGrupo = req.params.id;

  try {
    const itens = await getItensById(dbConn, idGrupo);
    const grupo = await getGrupoById(dbConn, idGrupo);

    
    const grupoComItens = grupo.map(grupo => ({
      ...grupo,
      itens: itens.filter(item => item.idGrupo === grupo.idGrupo)
    }));

    res.status(200).send({ 'grupoComItens': grupoComItens[0] });
  } catch (err) {
    res.status(403).send({ 'erro': err.message });
  }
};

// POST new item
module.exports.postItem = async (req, res) => {
  const { codBarras, nome, categoria, precoGrupo } = req.params; 

  const dbConn = dbConnection();

  try {
    const post = await adicionarItem(dbConn, codBarras, nome, categoria, precoGrupo);
    res.status(200).send({ 'result': post });
  } catch (err) {
    res.status(400).send({ 'erro': err.message });
  }
};

// UPDATE item
module.exports.putItem = async (req, res) => {
  const { nome, categoria, precoGrupo, idGrupo } = req.params; 

  const dbConn = dbConnection();

  try {
    const result = await updateItem(dbConn, nome, categoria, precoGrupo, idGrupo);
    res.status(200).send({ 'result': result });
  } catch (err) {
    res.status(400).send({ 'erro': err.message });
  }
};

// DELETE item
module.exports.deleteItem = async (req, res) => {
  const idItem = req.params.id;

  const dbConn = dbConnection();

  try {
    const result = await deleteItem(dbConn, idItem);

    if (result.affectedRows > 0) {
      res.status(200).send({ 'result': result });
    } else {
      res.status(400).send({ 'erro': "O item não foi apagado" });
    }
  } catch (err) {
    res.status(400).send({ 'erro': err.message });
  }
};
