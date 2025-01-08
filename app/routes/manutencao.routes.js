const express = require("express");
const router = express.Router();

const manutencaoController = require("../controllers/manutencaoController");
const validacaoManutencao = require("../middleware/validacao.manutencao");
const auth = require("../middleware/auth.usuario");

//GET
router.get("/", manutencaoController.getManutencao);
router.get("/:id", manutencaoController.getManutencaoById);

//POST
router.post('/:idItens/:motivo/:dataInic/:dataRetorno/:responsavel', auth.checarAuthAdmin, validacaoManutencao.validarManutencao, manutencaoController.postManutencao);

//PUT
router.put('/:idManutencao/:motivo/:dataInic/:dataRetorno/:responsavel', auth.checarAuthAdmin, manutencaoController.putManutencao);

//DELETE
router.delete('/:id', auth.checarAuthAdmin, manutencaoController.deleteManutencao);


module.exports = router;
