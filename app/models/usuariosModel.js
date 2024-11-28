const dbConnection = require("../../config/dbConnection");

module.exports = {
  getUsuarios: (dbConnection, callback) => {
    console.log("[Model usuario]");
    const sql = "SELECT * FROM usuario;";
    dbConnection.query(sql, callback);
  },
  getUsuarioById: (dbConnection, idUsuario, callback) => {
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
    tipo,
    callback
  ) => {
    console.log("[Model Adicionar Usuario]");

    const sql = `INSERT INTO contratante (nome, cpf, telefone, email, senha, nasc, data_Cad, tipo) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), ?)`;
    dbConnection.query(
      sql,
      [nome, cpf, telefone, email, senha, nasc, tipo],
      callback
    );
  },
};
