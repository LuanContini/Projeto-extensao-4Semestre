const express = require("express");
const router = express.Router();

const contratosController = require("../controllers/contratosController");
const contratosAdicionarController = require("../controllers/contratosAdicionarController");

// Rotas de renderização
router.get('/', contratosController.getContratos);
router.get('/adicionar', contratosAdicionarController.getContratoByUrl);

// Rotas de operações CRUD
router.get("/contrato/:id", contratosController.getContratoById);
router.post('/contrato', contratosController.postContrato);
router.put('/contrato/:id', contratosController.putContrato);
router.delete("/contrato/:id", contratosController.deleteContrato);

// Rotas de equipamentos
router.get('/selecionados', contratosAdicionarController.getContratoByUrl);
router.post('/adicionar', contratosAdicionarController.postContrato);
router.get('/inserir', contratosAdicionarController.inserirItens);
// router.post('/inserir', contratosAdicionarController.inserirContrato); // Nova rota POST

// Nova rota para criar contrato
router.post('/criar', contratosAdicionarController.criarContrato);

module.exports = router;