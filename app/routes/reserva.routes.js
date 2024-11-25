const express = require("express");
const router = express.Router();

const reservaController = require("../controllers/reservaController");

router.get("/", reservaController.getReserva);
//router.get("/:id", reservaController.getReservaById);

module.exports = router;
