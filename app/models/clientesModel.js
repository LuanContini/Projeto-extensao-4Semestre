module.exports = {
  getClientes: (dbConnection, callback) => {
    console.log("[Model cliente]");
    const sql = "SELECT * FROM contratante;";
    dbConnection.query(sql, callback);
  },
  adicionarCliente: (dbConnection, nome, cpf, telefone, email, callback) => {
    console.log("[Model adicionar cliente]");
    const sql = `INSERT INTO contratante (nome, cpf, telefone, email) VALUES (?, ?, ?, ?)`;

    dbConnection.query(sql, [nome, cpf, telefone, email], callback);
  },
};
