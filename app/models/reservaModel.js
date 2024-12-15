module.exports = {
  getReservas: (dbConnection, callback) => {
    console.log("[Model Reserva]");
    const sql =
      "SELECT idReserva, data_reserva, data_devol, tipo, localEven, cep, apelido FROM reserva INNER JOIN contrato ON contrato.idContrato = reserva.idContrato INNER JOIN grupo ON grupo.idGrupo = reserva.idGrupo;";
      return new Promise((resolve, reject) => {

        dbConnection.query(sql, (err, result) => {
          if(err) {
            reject(err);
          }else{
          resolve(result);
          }
        });
      });
  },
  getReservaById: (dbConnection, idReserva, callback) => {
    //TODO GET RESERVA POR ID ESPECIFICO MODEL
  },
  postReserva: (dbConnection, /*dados especificos para adicionar reserva*/ callback) => {
    //TODO ADICIONAR RESERVA MODEL
  },
  putReserva: (dbConnection,  /*dados especificos para editar reserva*/ callback) => {
    //TODO EDITAR RESERVA MODEL
  },
  deleteReserva: (dbConnection, idReserva, callback) => {
    //TODO DELETAR RESERVA MODEL
  }
};

