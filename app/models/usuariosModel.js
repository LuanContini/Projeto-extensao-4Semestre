module.exports = {
  getUsuarios: (dbConnection) => {
    console.log("[Model usuario]");
    const sql = "SELECT * FROM usuario;";
    return new Promise((resolve, reject) => {
      dbConnection.query(sql, (err, result) => {
        if(err) {
          reject(err);
        } else{
          resolve(result);
        }
      })
    });
  },
  getUsuarioById: (dbConnection, idUsuario) => {
    //TODO GET USUARIO POR ID ESPECIFICO
  },
  adicionarUsuario: (
    dbConnection,
    nome,
    cpf,
    telefone,
    email,
    senha,
    nasc,
    tipo
  ) => {
    console.log("[Model Adicionar Usuario]");

    const sql = `INSERT INTO usuario (nome, cpf, telefone, email, senha, dataNasc, dataCad, tipo) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), ?)`;
    return new Promise((resolve, reject) => {
      dbConnection.query(
        sql,
        [nome, cpf, telefone, email, senha, nasc, tipo],
        (err, result) => {
          if(err){
            reject(err);
          } else{
            resolve(result);
          }
        });
    })
    
  },
  updateUsuario: (
    dbConnection,
    idUsuario,
    nome,
    cpf,
    telefone,
    email,
    senha,
    nasc,
    tipo
  ) => {
    console.log("[Model Atualizar Usuario]");
  
    const sql = `
      UPDATE usuario
      SET nome = ?, cpf = ?, telefone = ?, email = ?, senha = ?, dataNasc = ?, tipo = ?
      WHERE idUsuario = ?
    `;
  
    return new Promise((resolve, reject) => {
      dbConnection.query(
        sql,
        [nome, cpf, telefone, email, senha, nasc, tipo, idUsuario],
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
  deleteUsuario: (dbConnection, idUsuario) => {
    console.log("[Model usuario]");
    const sql = "DELETE FROM usuario WHERE idUsuario = ?;";
    return new Promise((resolve, reject) => {
      dbConnection.query(sql, [idUsuario], (err, result) => {
        if(err) {
          reject(err);
        } else{
          resolve(result);
        }
      })
    });
  },
  
};
