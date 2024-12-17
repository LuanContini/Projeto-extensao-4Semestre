module.exports = {
  // Função para buscar itens
  getItens:  (dbConnection) => {
    console.log("[Model itens]");
    const sql = "SELECT * FROM itens;";
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
  getGrupos: (dbConnection) => {
    const sql = "SELECT * FROM grupo;";

    return new Promise((resolve, reject) => {
      dbConnection.query(sql, (err, result) => {
        if(err) {
          reject(err);
        }
        else {
          resolve(result);
        }
      });
    });
  },

  // Função para buscar itens por ID
  getItensById:  (dbConnection, idGrupo) => {
    console.log("[Model itens por ID]");
    const sql = `SELECT * FROM itens WHERE idGrupo = ?;`;
    return new Promise((resolve, reject) => {
      dbConnection.query(sql, [idGrupo], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  getGrupoById: (dbConnection, idGrupo) => {
    const sql = 'SELECT * FROM grupo WHERE idGrupo = ?;';

    return new Promise((resolve, reject) => {
      dbConnection.query(sql, [idGrupo], (err, result) => {
        if(err) {
          reject(err);
        } else  {
          resolve(result);
        } 
       });
    });
  },

  // Função para adicionar item
  adicionarItem: (dbConnection, codBarras, nome, categoria, precoGrupo) => {
    console.log("[Model adicionar item e criar grupo se necessário]");

    const verificarGrupoSql = `SELECT idGrupo FROM grupo WHERE nome = ? AND categoria = ?`;
    const criarGrupoSql = `INSERT INTO grupo (nome, categoria, precoGrupo) VALUES (?, ?, ?)`;
    const adicionarItemSql = `INSERT INTO itens (codBarras, dataLocacao, idGrupo) VALUES (?, CURRENT_TIMESTAMP(), ?)`;

    return new Promise((resolve, reject) => {
      dbConnection.query(verificarGrupoSql, [nome, categoria], (err, groupResults) => {
        if (err) {
          return reject(new Error("Erro ao verificar grupo: " + err.message));
        }

        let idGrupo;
        if (groupResults.length === 0) {
          dbConnection.query(criarGrupoSql, [nome, categoria, precoGrupo], (err, createGroupResult) => {
            if (err) {
              return reject(new Error("Erro ao criar grupo: " + err.message));
            }

            idGrupo = createGroupResult.insertId;
            console.log("Grupo criado com sucesso! ID:", idGrupo);

            dbConnection.query(adicionarItemSql, [codBarras, idGrupo], (err, result) => {
              if (err) {
                return reject(new Error("Erro ao adicionar item: " + err.message));
              }
              resolve(result);
            });
          });
        } else {
          idGrupo = groupResults[0].idGrupo;
          console.log("Grupo já existe, usando ID:", idGrupo);

          dbConnection.query(adicionarItemSql, [codBarras, idGrupo], (err, result) => {
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
  updateItem: (dbConnection, nome, categoria, precoGrupo, idGrupo) => {
    const sql = `UPDATE grupo SET nome = ?, categoria = ?, precoGrupo = ? where idGrupo = ?;`;
    return new Promise((resolve, reject) => {
      dbConnection.query(
        sql,
        [nome, categoria, precoGrupo, idGrupo],
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

//DELETE
  deleteItem: (dbConnection, idItem) => {
    const sql = `DELETE FROM itens WHERE idItens = ?;`;
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
