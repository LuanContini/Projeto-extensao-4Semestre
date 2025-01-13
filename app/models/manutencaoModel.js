module.exports = {
  //GETS
  getManutencao: (dbConnection) => {
    console.log("[Model manutencao]");
    const sql = "SELECT * FROM itens_em_manutencao_com_grupo;";
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

  getManutencaoById: (dbConnection, idManutencao) => {
    const sql = "SELECT * FROM itens_em_manutencao_com_grupo WHERE idManutencao = ?;";
    return new Promise((resolve, reject) => {
      dbConnection.getConnection((err, connection) => {
        if (err) {
          return reject(err); // Retorna erro se não conseguir obter a conexão
        }
        connection.query(sql, [idManutencao], (err, results) => {
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
  //--------------------------------------------------------
  
  //INSERT
  inserirManutencao: async (dbConnection, { motivo, dataInic, dataRetorno, responsavel }) => {
    const insertManutencaoQuery = `
      INSERT INTO manutencao (motivo, dataInic, dataRetorno, responsavel)
      VALUES (?, ?, ?, ?);
    `;

    return new Promise((resolve, reject) => {
      dbConnection.getConnection((err, connection) => {
        if (err) {
          return reject(new Error("Erro ao obter conexão: " + err.message));
        }
        connection.query(insertManutencaoQuery, [motivo, dataInic, dataRetorno, responsavel], (err, results) => {
          connection.release(); // Libera a conexão de volta ao pool
          if (err) {
            reject(err);
          } else {
            resolve(results.insertId);
          }
        });
      });
    });
  },
  
  inserirHistoricoManutencao: async (dbConnection, { dataInic, dataTerm, idManutencao, idItens }) => {
    const insertHistoricoQuery = `
      INSERT INTO historicoManutencao (dataInic, dataTerm, idManutencao, idItens)
      VALUES (?, ?, ?, ?);
    `;
    
    return new Promise((resolve, reject) => {
      dbConnection.getConnection((err, connection) => {
        if (err) {
          return reject(new Error("Erro ao obter conexão: " + err.message));
        }
        connection.query(insertHistoricoQuery, [dataInic, dataTerm, idManutencao, idItens], (err, results) => {
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
  //--------------------------------------------------------

  //UPDATE
  putManutencao: (dbConnection, { idManutencao, motivo, dataInic, dataRetorno, responsavel }) => {
    const updateQuery = `
      UPDATE manutencao
      SET motivo = ?, dataInic = ?, dataRetorno = ?, responsavel = ?
      WHERE idManutencao = ?;
    `;

    return new Promise((resolve, reject) => {
      dbConnection.getConnection((err, connection) => {
        if (err) {
          return reject(err); // Retorna erro se não conseguir obter a conexão
        }
        connection.query(updateQuery, [motivo, dataInic, dataRetorno, responsavel, idManutencao], (err, result) => {
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
  //--------------------------------------------------------

  //DELETE
  deleteManutencao: (dbConnection, idManutencao) => {
    const sql = 'DELETE FROM manutencao WHERE idManutencao = ?';

    return new Promise((resolve, reject) => {
      dbConnection.getConnection((err, connection) => {
        if (err) {
          return reject(err); // Retorna erro se não conseguir obter a conexão
        }
        connection.query(sql, [idManutencao], (err, result) => {
          connection.release(); // Libera a conexão de volta ao pool
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    });
  }
  //--------------------------------------------------------
};