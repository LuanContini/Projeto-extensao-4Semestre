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
    //TODO GET CLIENTE POR ID ESPECIFICO
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
  putCliente: (dbConnection, /* campos especificos para atualizar cliente*/ callback) => {
    //TODO EDITAR CLIENTE MODEL
  },
  deleteCliente: async (dbConnection, idCliente, callback) => {
    console.log('[Model deletar Cliente]');

    
  }
};
