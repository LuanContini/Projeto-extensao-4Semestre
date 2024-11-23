const dbConnection = require("../../config/dbConnection");

const { getItens, getItensByGroup } = require("../models/itensModel");

module.exports.getItens = (req, res) => {
  const dbConn = dbConnection();

  getItens(dbConn, (err, itens) => {
    if (err) {
      res.status(403).send({'erro' : err.message});
    }
    res.status(200).send({ 'itens': itens});
  });
};
module.exports.getItensByGroup = (req, res) => {
  const dbConn = dbConnection();

  const idGrupo = parseInt(req.params.id);
  console.log(idGrupo);
  getItensByGroup(dbConn, idGrupo, (err, itens) => {
    if(err){
      res.status(403).send({'erro' : err.message});
    }
    res.status(200).send({'itens':itens});
  });
}

//TODO
// module.exports.adicionarItem = (app, req, res) => {
//   const categoria = req.body.categoria;
//   const descricao = req.body.descricao;
//   const nome = req.body.nome;
//   const preco_loca = req.body.preco_loca;
//   const idGrupo = req.body.idGrupo;

//   const dbConn = dbConnection();

//   adicionarItem(
//     dbConn,
//     categoria,
//     descricao,
//     nome,
//     preco_loca,
//     idGrupo,
//     (error, result) => {}
//   );
//  };
