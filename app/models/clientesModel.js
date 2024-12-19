module.exports = {

  //GETS

  getClientes: (dbConnection) => {
    console.log("[Model cliente]");
    const sql = "SELECT * FROM contratante;";

    return new Promise((resolve, reject) => {
      dbConnection.query(sql, (err, result) => {
        if(err){
          reject(err);
        }
        else{
          resolve(result);
        }
      });
      
    });
  },
  getClienteById: (dbConnection, idCliente) => {
    console.log('[Model getClienteById]');

    const sql = 'SELECT * FROM contratante WHERE idContratante = ?';

    return new Promise((resolve, reject) => {
      dbConnection.query(sql, [idCliente], (err, result) => {
        if(err){
          reject(err);
        }
        else{
          resolve(result);
        }
      });
    });
  },
  //---------------
  
  //INSERT

  adicionarCliente: (dbConnection, nome, telefone, email, observacao) => {
    console.log("[Model adicionar cliente]");
    const sql = `
        INSERT INTO contratante (nome, email, telefone, observacao)
        VALUES (?, ?, ?, ?);
      `;

    return new Promise((resolve, reject) => {
      
      dbConnection.query(sql, [nome, email, telefone, observacao], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.insertId);
        }
      });
    });
    
  },
  adicionarPessoaFisica: (dbConnection, idContratante, cpf) => {
    const sql = `
        INSERT INTO pessoaFisica (idContratante, cpf)
        VALUES (?, ?);
      `;

    return new Promise((resolve, reject) => {
      
      dbConnection.query(sql, [idContratante, cpf], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  adicionarPessoaJuridica: (dbConnection, idContratante, cnpj) => {
    const sql = `
        INSERT INTO pessoaJuridica (idContratante, cnpj)
        VALUES (?, ?);
      `;
      
    return new Promise((resolve, reject) => {
      
      dbConnection.query(sql, [idContratante, cnpj], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  //----------------

  //UPDATE

  putCliente: (dbConnection, idCliente, nome, telefone, imagem, email, observacao) => {
    console.log('[Model update Cliente]');
    const sql = `
        UPDATE contratante
        SET nome = ?, email = ?, telefone = ?, imagem = ?, observacao = ?
        WHERE idContratante = ?
      `;

    return new Promise((resolve, reject) => {
      
      dbConnection.query(sql, [nome, email, telefone, imagem, observacao, idCliente], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  atualizarPessoaFisica: (dbConnection, idCliente, cpf) => {
    const sql = `
        UPDATE pessoaFisica
        SET cpf = ?
        WHERE idContratante = ?
      `;
    return new Promise((resolve, reject) => {
      
      dbConnection.query(sql, [cpf, idCliente], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  atualizarPessoaJuridica: (dbConnection, idCliente, cnpj) => {

    const sql = `
        UPDATE pessoaJuridica
        SET cnpj = ?
        WHERE idContratante = ?
      `;

    return new Promise((resolve, reject) => {
      
      dbConnection.query(sql, [cnpj, idCliente], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  //------------

  //DELETE
  deleteCliente: async (dbConnection, idCliente) => {
    console.log('[Model deletar Cliente]');
    
    const sql = `DELETE FROM contratante WHERE idContratante = ?;`;

    return new Promise((resolve, reject) => {
      dbConnection.query(sql, [idCliente], (err, result) => {
        if(err) {
          reject(err);
        }
        else{
          resolve(result);
        }
      });
    });
    
  }
};
