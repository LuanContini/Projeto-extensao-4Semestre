const dbConnection = require("../../config/dbConnection");

const {
  getItens,
  getItensById,
  adicionarItem,
  updateItem,
  deleteItem,
  deleteGrupo,
  getGrupos,
  getCategorias,
} = require("../models/itensModel");

// GET all items
module.exports.getItens = async (req, res) => {
  try {
    const dbConn = await dbConnection();
    const itens = await getItens(dbConn);
    const grupos = await getGrupos(dbConn);

    const itensComGrupos = grupos.map(grupo => {
      const itensDoGrupo = itens.filter(item => item.idGrupo === grupo.idGrupo);
      return {
        ...grupo,
        itens: itensDoGrupo,
        quantidadeItens: itensDoGrupo.length 
      };
    });

    res.render('telas_itens/tela_itens_inicial.ejs', { 'grupo': itensComGrupos, 'usuario': req.user });
  } catch (err) {
    res.status(403).send({ 'erro:': err.message });
  }
};

module.exports.getGrupoById = async (req, res) => {
  const dbConn = await dbConnection();
  const idGrupo = req.params.id;

  try {
    const grupoComItens = await getGrupoComItens(dbConn, idGrupo);
    res.render('telas_itens/tela_itens_olhar.ejs', { 'grupo': grupoComItens, 'usuario': req.user });
  } catch (err) {
    res.status(403).send({ 'erro': err.message });
  }
};

module.exports.editarGrupo = async (req, res) => {
  const dbConn = await dbConnection();
  const idGrupo = req.params.id;

  try {
    const grupoComItens = await getGrupoComItens(dbConn, idGrupo);
    const categorias = await getCategorias(dbConn);

    res.render('telas_itens/itens_editar_produto.ejs', { 'grupo': grupoComItens, 'categorias': categorias, usuario: req.user});
  } catch (err) {
    res.status(403).send({ 'erro': err.message });
  }
};


// GET item by ID
const getGrupoComItens = async (dbConn, idGrupo) => {
  const itens = await getItens(dbConn, idGrupo);
  const grupo = await getGrupos(dbConn, idGrupo);
  
  const grupoById = grupo.find((grupo) => grupo.idGrupo == idGrupo);
  
  if (!grupoById) {
    throw new Error("Grupo não encontrado");
  }

  const itensDoGrupo = itens.filter(item => item.idGrupo === grupoById.idGrupo);

  return {
    ...grupoById,
    itens: itensDoGrupo,
    quantidadeItens: itensDoGrupo.length
  };
};


// POST new item

module.exports.criarGrupo = async (req, res) => {


    const dbConn = await dbConnection();

  try {
    const categorias = await getCategorias(dbConn);

    res.render('telas_itens/itens_adicionar_produto.ejs', {'categorias': categorias, usuario: req.user});
  } catch (err) {
    res.status(403).send({ 'erro': err.message });
  }
  
};

module.exports.postItem = async (req, res) => {
  const { nome, categoria, precoGrupo, quantidadeItens } = req.body; 

  const dbConn = await dbConnection();

  try {
    const quantidade = parseInt(quantidadeItens, 10);
    if (isNaN(quantidade) || quantidade <= 0) {
      quantidadeItens = 1;
    }

    for (let i = 0; i < quantidade; i++) {
      await adicionarItem(dbConn, nome, categoria, precoGrupo);
    }

    res.redirect('/itens');
  } catch (err) {
    res.status(400).send({ 'erro': err.message });
  }
};

// UPDATE item
module.exports.putItem = async (req, res) => {
  const { nome, categoria, precoGrupo} = req.body;
  const idGrupo = req.params.idGrupo; 

  console.log(idGrupo);

  const dbConn = await dbConnection();

  try {
    const result = await updateItem(dbConn, nome, categoria, precoGrupo, idGrupo);

    res.redirect('/itens');
  } catch (err) {
    res.status(400).send({ 'erro': err.message });
  }
};

// DELETE item
module.exports.deleteItem = async (req, res) => {
  const idItem = req.params.id;

  const dbConn = await dbConnection();

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

module.exports.deleteGrupo = async (req, res) => {
  const idGrupo = req.params.id;

  const dbConn = await dbConnection();

  try {
    const result = await deleteGrupo(dbConn, idGrupo);

    if (result.affectedRows > 0) {
      res.status(200).send({ 'result': result });
    } 
  } catch (err) {
    res.status(400).send({ 'erro': err.message });
  }
};
