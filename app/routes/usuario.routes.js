const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuariosController");

router.get("/", usuarioController.getUsuarios);
//router.get("/:id", usuarioController.getUsuariosById);

module.exports = router;
