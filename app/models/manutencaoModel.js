module.exports = {

  //GETS
  getManutencao: (dbConnection) => {
    console.log("[Model manutencao]");
    const sql = "SELECT * FROM itens_em_manutencao_com_grupo;";
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
  getManutencaoById: (dbConnection, idManutencao) => {
    const sql = "SELECT * FROM itens_em_manutencao_com_grupo where idManutencao = ?;";
    return new Promise((resolve, reject) => {
    dbConnection.query(sql, [idManutencao], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
  },
  //--------------------------------------------------------
  
  //INSERT
  inserirManutencao: async ( dbConnection, { motivo, dataInic, dataRetorno, responsavel }) => {
    const insertManutencaoQuery = `
      INSERT INTO manutencao (motivo, dataInic, dataRetorno, responsavel)
      VALUES (?, ?, ?, ?);
    `;
    const [result] = await dbConnection.promise().execute(insertManutencaoQuery, [motivo, dataInic, dataRetorno, responsavel]);
    return result.insertId;
  },
   inserirHistoricoManutencao: async (dbConnection, { dataInic, dataTerm, idManutencao, idItens }) => {
    const insertHistoricoQuery = `
      INSERT INTO historicoManutencao (dataInic, dataTerm, idManutencao, idItens)
      VALUES (?, ?, ?, ?);
    `;
    await dbConnection.promise().execute(insertHistoricoQuery, [dataInic, dataTerm, idManutencao, idItens]);
    dbConnection.end();
  },
  //--------------------------------------------------------

  //UPDATE
  putManutencao: (dbConnection, {idManutencao, motivo, dataInic, dataRetorno, responsavel}) => {
    const updateQuery = `
    UPDATE manutencao
    SET motivo = ?, dataInic = ?, dataRetorno = ?, responsavel = ?
    WHERE idManutencao = ?;
  `;

  return new Promise((resolve, reject) => {
    dbConnection.query(updateQuery, [motivo, dataInic, dataRetorno, responsavel, idManutencao], (err, result) => {
      if(err) {
        reject(err);
      } else{
        resolve(result);
      }
    });

  })
  },
  //--------------------------------------------------------

  //DELETE
  deleteManutencao: (dbConnection, idManutencao) => {
    const sql = 'DELETE FROM manutencao WHERE idManutencao = ?';

    return new Promise((resolve, reject) => {
      dbConnection.query(sql, [idManutencao], (err, result) => {
        if(err) {
          reject(err);
        } else{
          resolve(result);
        }
      });
    });
  }
  //--------------------------------------------------------
};
