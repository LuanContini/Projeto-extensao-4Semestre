const express = require("express");
const router = express.Router();

const contratosController = require("../controllers/contratosController");

router.get("/", contratosController.getContratos);
//router.get("/:id", contratosController.getContratosById);

module.exports = router;
