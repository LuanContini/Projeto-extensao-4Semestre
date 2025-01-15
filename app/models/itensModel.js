const crypto = require('crypto');
const dbConnection = require('../../config/dbConnection');

module.exports = {
  // Função para buscar itens
  getItens: (dbConnection) => {
    console.log("[Model itens]");
    const sql = "SELECT * FROM itens_com_status;";
    return new Promise((resolve, reject) => {
      dbConnection.getConnection((err, connection) => {
        if (err) {
          return reject(err); // Retorna erro se não conseguir obter a conexão
        }
        connection.query(sql, (err, results) => {
          connection.release(); // Libera a conexão de volta ao pool
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    });
  },

  getGrupos: (dbConnection) => {
    const sql = "SELECT * FROM vw_itens_status;";
    return new Promise((resolve, reject) => {
      dbConnection.getConnection((err, connection) => {
        if (err) {
          return reject(err); // Retorna erro se não conseguir obter a conexão
        }
        connection.query(sql, (err, result) => {
          connection.release(); // Libera a conexão de volta ao pool
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    });
  },

  getCategorias: (dbConnection) => {
    const sql = 'SELECT * FROM categorias_grupos';
    return new Promise((resolve, reject) => {
      dbConnection.getConnection((err, connection) => {
        if (err) {
          return reject(err); // Retorna erro se não conseguir obter a conexão
        }
        connection.query(sql, (err, result) => {
          connection.release(); // Libera a conexão de volta ao pool
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    });
  },

  // Função para buscar itens por ID
  getItensById: (dbConnection, idGrupo) => {
    console.log("[Model itens por ID]");
    const sql = `SELECT * FROM itens WHERE idGrupo = ?;`;
    return new Promise((resolve, reject) => {
      dbConnection.getConnection((err, connection) => {
        if (err) {
          return reject(err); // Retorna erro se não conseguir obter a conexão
        }
        connection.query(sql, [idGrupo], (err, results) => {
          connection.release(); // Libera a conexão de volta ao pool
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    });
  },

  getGrupoById: (dbConnection, idGrupo) => {
    const sql = 'SELECT * FROM grupo WHERE idGrupo = ?;';
    return new Promise((resolve, reject) => {
      dbConnection.getConnection((err, connection) => {
        if (err) {
          return reject(err); // Retorna erro se não conseguir obter a conexão
        }
        connection.query(sql, [idGrupo], (err, result) => {
          connection.release(); // Libera a conexão de volta ao pool
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    });
  },

  // Função para adicionar item
  adicionarItem: (dbConnection, nome, categoria, precoGrupo) => {
    console.log("[Model adicionar item e criar grupo se necessário]");

    const verificarGrupoSql = `SELECT idGrupo FROM grupo WHERE nome = ? AND categoria = ?`;
    const criarGrupoSql = `INSERT INTO grupo (nome, categoria, precoGrupo) VALUES (?, ?, ?)`;
    const adicionarItemSql = `INSERT INTO itens (dataLocacao, idGrupo) VALUES (CURRENT_TIMESTAMP(), ?)`;
    const adicionarCodigoBarras = 'UPDATE itens SET codBarras = ? WHERE idItens = ?';

    return new Promise((resolve, reject) => {
      dbConnection.getConnection((err, connection) => {
        if (err) {
          return reject(new Error("Erro ao obter conexão: " + err.message));
        }

        connection.query(verificarGrupoSql, [nome, categoria], (err, groupResults) => {
          if (err) {
            connection.release(); // Libera a conexão de volta ao pool
            return reject(new Error("Erro ao verificar grupo: " + err.message));
          }

          let idGrupo;
          if ( groupResults.length === 0) {
            connection.query(criarGrupoSql, [nome, categoria, precoGrupo], (err, createGroupResult) => {
              if (err) {
                connection.release(); // Libera a conexão de volta ao pool
                return reject(new Error("Erro ao criar grupo: " + err.message));
              }

              idGrupo = createGroupResult.insertId;

              connection.query(adicionarItemSql, [idGrupo], (err, result) => {
                if (err) {
                  connection.release(); // Libera a conexão de volta ao pool
                  return reject(new Error("Erro ao adicionar item: " + err.message));
                }
                const idItem = result.insertId;

                connection.query(adicionarCodigoBarras, [GerarCodigoDeBarras(idItem), idItem], (err, result) => {
                  connection.release(); // Libera a conexão de volta ao pool
                  if (err) {
                    return reject(err);
                  }

                  resolve(result);
                });
              });
            });
          } else {
            idGrupo = groupResults[0].idGrupo;

            connection.query(adicionarItemSql, [idGrupo], (err, result) => {
              if (err) {
                connection.release(); // Libera a conexão de volta ao pool
                return reject(new Error("Erro ao adicionar item: " + err.message));
              }
              const idItem = result.insertId;

              connection.query(adicionarCodigoBarras, [GerarCodigoDeBarras(idItem), idItem], (err, result) => {
                connection.release(); // Libera a conexão de volta ao pool
                if (err) {
                  return reject(err);
                }

                resolve(result);
              });
            });
          }
        });
      });
    });
  },
  adicionarItem: (dbConnection, idGrupo) => {
    const adicionarItemSql = `INSERT INTO itens (dataLocacao, idGrupo) VALUES (CURRENT_TIMESTAMP(), ?)`;
    const adicionarCodigoBarras = 'UPDATE itens SET codBarras = ? WHERE idItens = ?';

    return new Promise((resolve, reject) => {
      dbConnection.getConnection((err, connection) => {
        if (err) {
          return reject(err); 
        }
        connection.query(adicionarItemSql, [idGrupo], (err, result) => {
          if (err) {
            connection.release(); 
            return reject(new Error("Erro ao adicionar item: " + err.message));
          }
          const idItem = result.insertId;

          connection.query(adicionarCodigoBarras, [GerarCodigoDeBarras(idItem), idItem], (err, result) => {
            connection.release(); // Libera a conexão de volta ao pool
            if (err) {
              return reject(err);
            }

            resolve(result);
          });
        });
      });
    });
  },

  // Função para atualizar um item
  updateItem: (dbConnection, nome, categoria, precoGrupo, idGrupo) => {
    const sql = `UPDATE grupo SET nome = ?, categoria = ?, precoGrupo = ? WHERE idGrupo = ?;`;
    return new Promise((resolve, reject) => {
      dbConnection.getConnection((err, connection) => {
        if (err) {
          return reject(err); 
        }
        connection.query(sql, [nome, categoria, precoGrupo, idGrupo], (err, results) => {
          connection.release(); // Libera a conexão de volta ao pool
          if (err) {
            reject(err);
          } else {
            console.log(results);
            resolve(results);
          }
        });
      });
    });
  },

  // DELETE
  deleteItem: (dbConnection, idItem) => {
    const sql = `DELETE FROM itens WHERE idItens = ?;`;
    return new Promise((resolve, reject) => {
      dbConnection.getConnection((err, connection) => {
        if (err) {
          return reject(err); // Retorna erro se não conseguir obter a conexão
        }
        connection.query(sql, [idItem], (err, results) => {
          connection.release(); // Libera a conexão de volta ao pool
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    });
  },

  deleteGrupo: (dbConnection, idGrupo) => {
    const sql = `DELETE FROM grupo WHERE idGrupo = ?;`;
    return new Promise((resolve, reject) => {
      dbConnection.getConnection((err, connection) => {
        if (err) {
          return reject(err); // Retorna erro se não conseguir obter a conexão
        }
        connection.query(sql, [idGrupo], (err, results) => {
          connection.release(); // Libera a conexão de volta ao pool
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    });
  },
};

function GerarCodigoDeBarras(data) {
  // Converter o dado para string
  const dataStr = String(data);

  // Gerar um hash SHA-256
  const hash = crypto.createHash('sha256').update(dataStr).digest('base64');

  // Garantir que o resultado tenha exatamente 13 caracteres
  const encryptedCode = hash.replace(/[^a-zA-Z0-9]/g, '').slice(0, 13);

  return encryptedCode;
}