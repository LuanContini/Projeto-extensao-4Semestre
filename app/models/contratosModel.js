module.exports = {
  getContratos: (dbConnection, callback) => {
    console.log("[Model contrato]");
    const sql = "SELECT * FROM contrato;";
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
};
