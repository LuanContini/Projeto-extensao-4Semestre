const dbConnection = require("../../config/dbConnection");

const { getReservas } = require("../models/reservaModel");

module.exports.reserva = (app, req, res) => {
  const dbConn = dbConnection();

  getReservas(dbConn, (error, reservas) => {
    if (error) {
      console.log("erro ", error.message);
      return;
    }
    console.log(reservas);
    res.render("reservaView.ejs", { reservas: reservas });
  });
};
