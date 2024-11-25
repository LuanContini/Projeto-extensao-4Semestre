const express = require("express");
const router = express.Router();

const manutencaoController = require("../controllers/manutencaoController");

router.get("/", manutencaoController.getManutencao);
//router.get("/:id", manutencaoController.getContratosById);

module.exports = router;
