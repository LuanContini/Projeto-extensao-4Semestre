const dbConnection = require("../../config/dbConnection");

const {
  getItens,
  getItensById,
  adicionarItem,
  updateItem,
  deleteItem,
} = require("../models/itensModel");

//GET
module.exports.getItens = async (req, res) => {
  try {
    const dbConn = dbConnection();  

    const itens = await getItens(dbConn);

    res.status(200).send({ "itens": itens });
  } catch (err) {
    res.status(403).send({ "erro": err.message });
  }
};

module.exports.getItensById = async (req, res) => {
  const dbConn = dbConnection();

  const idItem = req.params.id;
  console.log(idItem);
  try{
    const item = await getItensById(dbConn, idItem);

    res.status(200).send({'item': item});
  }catch (err) {
    res.status(403).send({'err': err});
  }
};

//POST
module.exports.postItem = (req, res) => {
  const {cod_barras, nome, categoria, preco_loca } = req.params;

  const dbConn = dbConnection();

  try{
    const post = adicionarItem(dbConn, cod_barras, nome, categoria, preco_loca);

    res.status(200).send({'result': post});

  }catch (err) {
    res.status(400).send({'err': err});
  }
};

//UPDATE

module.exports.putItem = (req, res) => {
  const {nome, categoria, preco_loca, idGrupo} = req.params;

  const dbConn = dbConnection();

  updateItem(dbConn, nome, categoria, preco_loca, idGrupo, (err, result) => {
    if(err) res.status(400).send({'err': err});

    res.status(200).send({'result': result});

  });
}

//DELETE
module.exports.deleteItem = (req, res) => {
  const idItem = req.params.id;

  const dbConn = dbConnection();

  deleteItem(dbConn, idItem, (err, result) => {
    if(err) res.status(400).send({'err': err});

    if(result.affectedRows > 0){
    res.status(200).send({'result': result});

    }
    else res.status(400).send({'err': "O item não foi apagado"});
  });
}
