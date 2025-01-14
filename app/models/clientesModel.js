module.exports = {
  //GETS

  getClientes: (dbConnection) => {
    console.log("[Model cliente]");
    const sql = "SELECT * FROM contratante;";

    return new Promise((resolve, reject) => {
      dbConnection.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  getClienteById: (dbConnection, idCliente) => {
    console.log("[Model getClienteById]");

    const sql = "SELECT * FROM contratante WHERE idContratante = ?";

    return new Promise((resolve, reject) => {
      dbConnection.query(sql, [idCliente], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  //---------------

  //INSERT

  adicionarCliente: (
    dbConnection,
    nome,
    telefone,
    email,
    observacao,
    imagem,
    cpf,
    cnpj
  ) => {
    console.log("[Model adicionar cliente]");
    const sql = `
        INSERT INTO contratante (nome, telefone, email, observacao, imagem, 
          cpf, cnpj)
        VALUES (?, ?, ?, ?, ?, ?, ?);
      `;

    return new Promise((resolve, reject) => {
      dbConnection.query(
        sql,
        [nome, telefone, email, observacao, imagem, cpf, cnpj],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.insertId);
          }
        }
      );
    });
  },
  //----------------

  //UPDATE

  putCliente: (
    dbConnection,
    idCliente,
    nome,
    telefone,
    email,
    observacao,
    imagem,
    cpf,
    cnpj
  ) => {
    const sql = `
      UPDATE contratante
      SET nome = ?, telefone = ?, email = ?, observacao = ?, imagem = ?, 
          cpf = ?, cnpj = ?
      WHERE idContratante = ?;`;

    return new Promise((resolve, reject) => {
      dbConnection.query(
        sql,
        [nome, telefone, email, observacao, imagem, cpf, cnpj, idCliente],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  //------------

  //DELETE
  deleteCliente: async (dbConnection, idCliente) => {
    console.log("[Model deletar Cliente]");

    const sql = `DELETE FROM contratante WHERE idContratante = ?;`;

    return new Promise((resolve, reject) => {
      dbConnection.query(sql, [idCliente], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  fetchContratantes: async (dbConn) => {
    const sql = "SELECT idContratante, nome, email, telefone FROM contratante";
    return new Promise((resolve, reject) => {
        dbConn.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
  }
};
