const express = require("express");
const router = express.Router();

const reservaController = require("../controllers/reservaController");

router.get("/", reservaController.getReserva);
router.get("/:id", reservaController.getReservaById);

router.post('/' /*dados especificos para adicionar reserva*/, reservaController.postReserva);

router.put('/:id' /*dados especificos para editar reserva*/, reservaController.putReserva);

router.delete('/:id', reservaController.deleteReserva);

module.exports = router;
