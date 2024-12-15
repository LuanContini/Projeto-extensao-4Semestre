module.exports = {
  getContratos: (dbConnection, callback) => {
    console.log("[Model contrato]");
    const sql = "SELECT * FROM vw_contratos;";
    dbConnection.query(sql, callback);
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
  getContratoById: (dbConnection, idContrato, callback) => {
    //TODO GET CONTRATO POR ID ESPECIFICO MODEL
  },
  putContrato: (dbConnection, /*outros campos*/ callback) => {
    //TODO EDITAR CONTRATOS MODEL
  },
  
  deleteContrato: (dbConnection, idContrato, callback) => {
    //TODO EXCLUIR CONTRATOS MODEL
  }
};


