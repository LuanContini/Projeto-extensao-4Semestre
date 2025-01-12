module.exports = {
  getContratosModel: (dbConnection) => {
  console.log("[Model contrato]");
  const sql = "SELECT * FROM contrato;";
  return new Promise((resolve, reject) => {
    dbConnection.query(sql, (err, results) => {
      if (err) {
        return reject(err); // Rejeita a Promise em caso de erro
      }
      resolve(results); // Resolve a Promise com os resultados
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
  idContratante
) => {
  const sql = `INSERT INTO contrato (tipo, localEven, cep, apelido, idUsuario, idContratante) VALUES (?, ?, ?, ?, ?, ?)`;

  return new Promise((resolve, reject) => {
    dbConnection.query(
      sql,
      [tipo, localEven, cep, apelido, idUsuario, idContratante],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      }
    );
  });
},


putContrato: (dbConnection, /*outros campos*/ callback) => {
  //TODO EDITAR CONTRATOS MODEL
},

deleteContrato: (dbConnection, idContrato, callback) => {
  //TODO EXCLUIR CONTRATOS MODEL
},

getContratoStatus: (dbConnection) => {
  console.log("[Model contrato por status]");
  const sql = `
      SELECT 
      CASE
          WHEN NOW() BETWEEN dataHoraIni AND dataHoraTerm THEN 'andamento'
          WHEN NOW() < dataHoraTerm THEN 'pendente'
          WHEN NOW() > dataHoraTerm THEN 'concluído'
          ELSE 'desconhecido'
      END AS status,
      SUM(valorTotal) AS totalContratos
  FROM contrato
  GROUP BY 
      CASE
          WHEN NOW() BETWEEN dataHoraIni AND dataHoraTerm THEN 'andamento'
          WHEN NOW() < dataHoraTerm THEN 'pendente'
          WHEN NOW() > dataHoraTerm THEN 'concluído'
          ELSE 'desconhecido'
      END;
    `;
  return new Promise((resolve, reject) => {
    dbConnection.query(sql, (err, results) => {
      if (err) {
        return reject(err);
      }
      else{
        resolve(results);
      }

    });
  });
},
};


