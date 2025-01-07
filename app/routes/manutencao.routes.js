const express = require("express");
const router = express.Router();

const manutencaoController = require("../controllers/manutencaoController");
const validacaoManutencao = require("../middleware/validacao.manutencao");

//GET
router.get("/", manutencaoController.getManutencao);
router.get("/:id", manutencaoController.getManutencaoById);

//POST
router.post('/:idItens/:motivo/:dataInic/:dataRetorno/:responsavel', validacaoManutencao.validarManutencao, manutencaoController.postManutencao);

//PUT
router.put('/:idManutencao/:motivo/:dataInic/:dataRetorno/:responsavel', manutencaoController.putManutencao);

//DELETE
router.delete('/:id', manutencaoController.deleteManutencao);


module.exports = router;
