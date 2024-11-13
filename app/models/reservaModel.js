module.exports = {
  getReservas: (dbConnection, callback) => {
    console.log("[Model Reserva]");
    const sql =
      "SELECT idReserva, data_reserva, data_devol, tipo, localEven, cep, apelido FROM reserva INNER JOIN contrato ON contrato.idContrato = reserva.idContrato INNER JOIN grupo ON grupo.idGrupo = reserva.idGrupo;";
    dbConnection.query(sql, callback);
  },
};
