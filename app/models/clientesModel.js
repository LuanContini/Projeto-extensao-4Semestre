module.exports = {
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
  adicionarCliente: async (dbConnection, nome, cpf, telefone, email) => {
    console.log("[Model adicionar cliente]");
    const sql = `INSERT INTO contratante (nome, cpf, telefone, email) VALUES (?, ?, ?, ?)`;

    return new Promise((resolve, reject) => {
      dbConnection.query(sql, [nome, cpf, telefone, email], (err, result) => {
        if(err) {
          reject(err);
        }
        else{
          resolve(result);
        }
      });
    });
    
  },
  putCliente: (dbConnection, idCliente, nome, cpf, telefone, email) => {
    console.log('[Model update Cliente]');

    const sql = `UPDATE contratante SET nome = ?, cpf = ?, telefone = ?, email = ? where idContratante = ?;`;

    return new Promise((resolve, reject) => {
      dbConnection.query(sql, [nome, cpf, telefone, email, idCliente], (err, result) => {
        if(err){
          reject(err);
        }
        else{
          resolve(result);
        }
      });
    });
  },
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
