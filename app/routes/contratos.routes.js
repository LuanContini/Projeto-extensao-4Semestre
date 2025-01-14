const express = require("express");
const router = express.Router();

const contratosController = require("../controllers/contratosController");
const contratosAdicionarController = require("../controllers/contratosAdicionarController");

// Rotas de renderização
router.get('/', contratosController.getContratos);
router.get('/adicionar', contratosAdicionarController.getContratoByUrl);

// Rotas de operações CRUD
router.post('/adicionar', contratosAdicionarController.postContrato);
router.get("/:id", contratosController.getContratoById);
router.post('/', contratosController.postContrato);
router.put('/:id', contratosController.putContrato);
router.delete('/:id', contratosController.deleteContrato);

module.exports = router;
