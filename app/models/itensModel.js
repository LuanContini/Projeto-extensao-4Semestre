const dbConnection = require("../../config/dbConnection");

module.exports = {
  getItens: (dbConnection, callback) => {
    console.log("[Model itens]");
    const sql = "SELECT * FROM item_grupo ORDER BY categoria ASC;";
    dbConnection.query(sql, callback);
  },
  getItensById: (dbConnection, idItem, callback) => {
    console.log("[Model itens por ID]");
    const sql = `SELECT * FROM item WHERE idGrupo = ${idItem};`;
    dbConnection.query(sql, callback);
  },
  adicionarItem: (
    dbConnection,
    cod_barras,
    nome,
    categoria,
    preco_loca,
    callback
  ) => {
    console.log("[Model adicionar item e criar grupo se necessário]");

    const verificarGrupoSql = `SELECT idGrupo FROM grupo WHERE nome = ? AND categoria = ? AND preco_loca = ?`;

    const criarGrupoSql = `INSERT INTO grupo (nome, categoria, preco_loca) VALUES (?, ?, ?)`;

    const adicionarItemSql = `INSERT INTO item (cod_barras, data_adicao, idGrupo) VALUES (?, CURRENT_TIMESTAMP(), ?)`;

    dbConnection.query(
      verificarGrupoSql,
      [nome, categoria, preco_loca],
      (err, results) => {
        if (err) {
          console.error("Erro ao verificar o grupo:", err);
          return callback(err);
        }

        if (results.length === 0) {
          dbConnection.query(
            criarGrupoSql,
            [nome, categoria, preco_loca],
            (err, result) => {
              if (err) {
                console.error("Erro ao criar o grupo:", err);
                return callback(err);
              }

              const novoIdGrupo = result.insertId;
              console.log("Grupo criado com sucesso! ID:", novoIdGrupo);

              dbConnection.query(
                adicionarItemSql,
                [cod_barras, novoIdGrupo],
                callback
              );
            }
          );
        } else {
          const idGrupoExistente = results[0].idGrupo;
          console.log("Grupo já existe, usando ID:", idGrupoExistente);

          dbConnection.query(
            adicionarItemSql,
            [cod_barras, idGrupoExistente],
            callback
          );
        }
      }
    );
  },
  updateItem: (dbConnection, nome, categoria, preco_loca, idGrupo, callback) => {
    const sql = `UPDATE grupo SET nome = ?, categoria = ?, preco_loca = ? where idGrupo = ?;`;

    dbConnection.query(sql, [nome, categoria, preco_loca, idGrupo], callback);
  },
  deleteItem: (dbConnection, idItem, callback) => {
    const sql = `DELETE FROM item WHERE idItem = ?;`;

    dbConnection.query(sql, [idItem], callback);
  },
};
