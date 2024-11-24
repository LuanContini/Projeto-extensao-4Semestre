const express = require("express");

const router = express.Router();

const itemRoute = require("./item.routes");
const clienteRoute = require("./cliente.routes");
const contratoRoute = require("./contrato.routes");
const manutencaoRoute = require("./manutencao.routes");
const reservaRoute = require("./reserva.routes");
const usuarioRoute = require("./usuario.routes");

router.use("/itens", itemRoute);
router.use("/clientes", clienteRoute);
router.use("/contrato", contratoRoute);
router.use("/manutencao", manutencaoRoute);
router.use("/reserva", reservaRoute);
router.use("/usuario", usuarioRoute);

module.exports = router;
