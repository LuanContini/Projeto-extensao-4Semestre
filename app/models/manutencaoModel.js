module.exports = {
  getManutencao: (dbConnection, callback) => {
    console.log("[Model manutencao]");
    const sql = "SELECT * FROM item_manutencao_view;";
    dbConnection.query(sql, callback);
  },
};
