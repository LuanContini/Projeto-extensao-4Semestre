const dbConnection = require("../../config/dbConnection");

const {
  getItens,
  getItensById,
  adicionarItem,
  updateItem,
  deleteItem,
} = require("../models/itensModel");

//GET
module.exports.getItens = (req, res) => {
  const dbConn = dbConnection();

  getItens(dbConn, (err, itens) => {
    if (err) {
      res.status(403).send({ "erro": err.message });
    }
    res.status(200).send({ "itens": itens });
  });
};
module.exports.getItensById = (req, res) => {
  const dbConn = dbConnection();

  const idItem = req.params.id;
  console.log(idItem);
  getItensById(dbConn, idItem, (err, item) => {
    if (err) {
      res.status(403).send({ "erro": err.message });
    }
    res.status(200).send({ "item": item });
  });
};

//POST
module.exports.postItem = (req, res) => {
  const {cod_barras, nome, categoria, preco_loca } = req.params;

  const dbConn = dbConnection();

  adicionarItem(dbConn, cod_barras, nome, categoria, preco_loca, (err, result) => {
    if (err) res.status(400).send({ "err": err });

    res.status(200).send({ "result": result });
  });
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
