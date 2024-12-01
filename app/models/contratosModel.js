module.exports = {
  getContratos: (dbConnection) => {
    console.log("[Model contrato]");
    const sql = "SELECT * FROM vw_dados_contratos;";

    return new Promise((resolve, reject) => {
      
      dbConnection.query(sql, (err, result) => {
        if(err) {
          reject(err);
        }else{
          resolve(result);
        }
      });
    });
  },

  getContratoById: (dbConnection, idContrato) => {

    console.log('[Model getContratoById]');

    const sql = 'SELECT * FROM vw_dados_contratos WHERE contrato_id = ?';

    return new Promise((resolve, reject) => {
      dbConnection.query(sql, [idContrato], (err, result) => {
        if(err){
          reject(err);
        }
        else{
          resolve(result);
        }
      });
    });
  },
  adicionarContrato: (
    dbConnection,
    tipo,
    localEven,
    cep,
    apelido,
    idUsuario,
    idContratante,
    callback
  ) => {
    const sql = `INSERT INTO contrato (tipo, localEven, cep, apelido, idUsuario, idContratante) VALUES (?, ?, ?, ?, ?, ?)`;

    dbConnection.query(
      sql,
      [tipo, localEven, cep, apelido, idUsuario, idContratante],
      callback
    );
  },
  
  putContrato: (dbConnection, /*outros campos*/ callback) => {
    //TODO EDITAR CONTRATOS MODEL
  },
  
  deleteContrato: (dbConnection, idContrato, callback) => {
    //TODO EXCLUIR CONTRATOS MODEL
  }
};


