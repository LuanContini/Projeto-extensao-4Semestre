const express = require("express");
const auth = require("../middleware/auth.usuario");

const router = express.Router();

const itemRoute = require("./item.routes");
const clienteRoute = require("./cliente.routes");
const contratoRoute = require("./contrato.routes");
const manutencaoRoute = require("./manutencao.routes");
const usuarioRoute = require("./usuario.routes");

router.use("/itens", auth.checarAuth, itemRoute);
router.use("/clientes", auth.checarAuth, clienteRoute);
router.use("/contrato", auth.checarAuth, contratoRoute);
router.use("/manutencao", auth.checarAuth, manutencaoRoute);
router.use("/usuario", usuarioRoute);

module.exports = router;
