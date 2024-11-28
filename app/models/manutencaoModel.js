const dbConnection = require("../../config/dbConnection");

module.exports = {
  getManutencao: (dbConnection, callback) => {
    console.log("[Model manutencao]");
    const sql = "SELECT * FROM item_manutencao_view;";
    dbConnection.query(sql, callback);
  },
  getManutencaoById: (dbConnection, idManutencao, callback) => {
    //TODO GET MANUTENCAO POR ID ESPECIFICO MODEL
  },
  postManutencao: (dbConnection, /*campos especificos*/ callback) => {
    //TODO ADICIONAR MANUTENÇÃO 
  },
  putManutencao: (dbConnection, /*campos especificos*/ callback) => {
    //TODO EDITAR MANUTENCAO MODEL
  },
  deleteManutencao: (dbConnection, idManutencao, callback) => {
    //TODO DELETE MANUTENÇÃO MODEL
  }

};
