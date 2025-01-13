module.exports = {
  getContratos: (dbConnection, callback) => {
    console.log("[Model contrato]");
    const sql = "SELECT * FROM vw_contratos;";

    dbConnection.getConnection((err, connection) => {
      if (err) {
        return callback(err, null); // Retorna erro se não conseguir obter a conexão
      }
      connection.query(sql, (err, result) => {
        connection.release(); // Libera a conexão de volta ao pool
        if (err) {
          return callback(err, null); // Retorna erro se a consulta falhar
        }
        callback(null, result); // Retorna o resultado da consulta
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

    dbConnection.getConnection((err, connection) => {
      if (err) {
        return callback(err, null); // Retorna erro se não conseguir obter a conexão
      }
      connection.query(
        sql,
        [tipo, localEven, cep, apelido, idUsuario, idContratante],
        (err, result) => {
          connection.release(); // Libera a conexão de volta ao pool
          if (err) {
            return callback(err, null); // Retorna erro se a consulta falhar
          }
          callback(null, result.insertId); // Retorna o ID do novo contrato
        }
      );
    });
  },

  putContrato: (dbConnection, /*outros campos*/, callback) => {
    // TODO: Implementar a lógica para editar contratos
    // Exemplo de como obter a conexão e liberar
    dbConnection.getConnection((err, connection) => {
      if (err) {
        return callback(err, null); // Retorna erro se não conseguir obter a conexão
      }
      // Aqui você deve implementar a lógica para atualizar o contrato
      // connection.query(sql, params, (err, result) => {
      //   connection.release(); // Libera a conexão de volta ao pool
      //   if (err) {
      //     return callback(err, null); // Retorna erro se a consulta falhar
      //   }
      //   callback(null, result); // Retorna o resultado da consulta
      // });
    });
  },

  deleteContrato: (dbConnection, idContrato, callback) => {
    const sql = `DELETE FROM contrato WHERE idContrato = ?;`;

    dbConnection.getConnection((err, connection) => {
      if (err) {
        return callback(err, null); // Retorna erro se não conseguir obter a conexão
      }
      connection.query(sql, [idContrato], (err, result) => {
        connection.release(); // Libera a conexão de volta ao pool
        if (err) {
          return callback(err, null); // Retorna erro se a consulta falhar
        }
        callback(null, result); // Retorna o resultado da consulta
      });
    });
  },
};