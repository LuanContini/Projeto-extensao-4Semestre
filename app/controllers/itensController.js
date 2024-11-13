const dbConnection = require("../../config/dbConnection");

const { getItens } = require("../models/itensModel");

module.exports.itens = (app, req, res) => {
  const dbConn = dbConnection();

  getItens(dbConn, (error, itens) => {
    if (error) {
      console.log("erro ", error.message);
    }
    console.log(itens);
    res.render("itensView.ejs", { itensGrupo: itens });
  });
};
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
