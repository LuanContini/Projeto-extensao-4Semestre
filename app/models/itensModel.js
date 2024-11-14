module.exports = {
  getItens: (dbConnection, callback) => {
    console.log("[Model itens]");
    const sql = "SELECT * FROM item_grupo;";
    dbConnection.query(sql, callback);
  },
  //TODO
  // adicionarItem: (
  //   dbConnection,
  //   categoria,
  //   descricao,
  //   nome,
  //   preco_loca,
  //   idGrupo,
  //   callback
  // ) => {
  //   console.log("[Model adicionar item]");
  //   const sql = `INSERT INTO item(categoria, descricao, nome, preco_loca, data_adicao, idGrupo) VALUES (${categoria}, ${descricao}, ${nome}, ${preco_loca}, CURRENT_TIMESTAMP(), ${idGrupo})`;
  // },
};
