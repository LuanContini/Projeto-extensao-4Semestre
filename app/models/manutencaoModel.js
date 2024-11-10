module.exports = {
  getManutencao: (dbConnection, callback) => {
    console.log("[Model manutencao]");
    const sql = "SELECT * FROM manutencao;";
    dbConnection.query(sql, callback);
  },
};
