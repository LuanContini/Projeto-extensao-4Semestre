const dbConnection = require("../../config/dbConnection");

const { getReservas, getReservaById, postReserva, putReserva, deleteReserva } = require("../models/reservaModel");

module.exports.getReserva = (app, req, res) => {
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

module.exports.getReservaById = (req, res) => {
  //TODO GET RESERVA POR ID ESPECIFICO
};

module.exports.postReserva = (req, res) => {
  //TODO ADICIONAR RESERVA 
};

module.exports.putReserva = (req, res) => {
  //TODO EDITAR RESERVA
};

module.exports.deleteReserva = (req, res) => {
  //TODO DELETAR RESERVA
};
