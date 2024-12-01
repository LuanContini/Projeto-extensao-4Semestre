const dbConnection = require("../../config/dbConnection");

const { getReservas, getReservaById, postReserva, putReserva, deleteReserva } = require("../models/reservaModel");

module.exports.getReserva = async (req, res) => {
  try {
    const dbConn = dbConnection();
    const reservas = await getReservas(dbConn);
    res.status(200).send({ 'reservas': reservas });
  } catch (err) {
    res.status(403).send({ 'erro:': err.message });
  }
};

module.exports.getReservaById = (req, res) => {

  try{

    res.status(200).send({ 'reserva': reserva});
  }catch (err){
    res.status(400).send({'err': err});
  }
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
