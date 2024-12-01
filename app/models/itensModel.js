const dbConnection = require("../../config/dbConnection");

module.exports = {
  // Função para buscar itens
  getItens:  (dbConnection) => {
    console.log("[Model itens]");
    const sql = "SELECT * FROM item_grupo ORDER BY categoria ASC;";
    return new Promise((resolve, reject) => {
      dbConnection.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  // Função para buscar itens por ID
  getItensById:  (dbConnection, idItem) => {
    console.log("[Model itens por ID]");
    const sql = `SELECT * FROM item WHERE idGrupo = ?;`;
    return new Promise((resolve, reject) => {
      dbConnection.query(sql, [idItem], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  // Função para adicionar item
  adicionarItem: (dbConnection, cod_barras, nome, categoria, preco_loca) => {
    console.log("[Model adicionar item e criar grupo se necessário]");

    const verificarGrupoSql = `SELECT idGrupo FROM grupo WHERE nome = ? AND categoria = ?`;
    const criarGrupoSql = `INSERT INTO grupo (nome, categoria, preco_loca) VALUES (?, ?, ?)`;
    const adicionarItemSql = `INSERT INTO item (cod_barras, data_adicao, idGrupo) VALUES (?, CURRENT_TIMESTAMP(), ?)`;

    return new Promise((resolve, reject) => {
      dbConnection.query(verificarGrupoSql, [nome, categoria], (err, groupResults) => {
        if (err) {
          return reject(new Error("Erro ao verificar grupo: " + err.message));
        }

        let idGrupo;
        if (groupResults.length === 0) {
          dbConnection.query(criarGrupoSql, [nome, categoria, preco_loca], (err, createGroupResult) => {
            if (err) {
              return reject(new Error("Erro ao criar grupo: " + err.message));
            }

            idGrupo = createGroupResult.insertId;
            console.log("Grupo criado com sucesso! ID:", idGrupo);

            dbConnection.query(adicionarItemSql, [cod_barras, idGrupo], (err, result) => {
              if (err) {
                return reject(new Error("Erro ao adicionar item: " + err.message));
              }
              resolve(result);
            });
          });
        } else {
          idGrupo = groupResults[0].idGrupo;
          console.log("Grupo já existe, usando ID:", idGrupo);

          dbConnection.query(adicionarItemSql, [cod_barras, idGrupo], (err, result) => {
            if (err) {
              return reject(new Error("Erro ao adicionar item: " + err.message));
            }
            resolve(result);
          });
        }
      });
    });
  },

  // Função para atualizar um item
  updateItem: (dbConnection, nome, categoria, preco_loca, idGrupo) => {
    const sql = `UPDATE grupo SET nome = ?, categoria = ?, preco_loca = ? where idGrupo = ?;`;
    return new Promise((resolve, reject) => {
      dbConnection.query(
        sql,
        [nome, categoria, preco_loca, idGrupo],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  },

  // Função para deletar um item
  deleteItem: (dbConnection, idItem) => {
    const sql = `DELETE FROM item WHERE idItem = ?;`;
    return new Promise((resolve, reject) => {
      dbConnection.query(sql, [idItem], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
};
