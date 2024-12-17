const express = require("express");
const router = express.Router();

const manutencaoController = require("../controllers/manutencaoController");

router.get("/", manutencaoController.getManutencao);
router.get("/:id", manutencaoController.getManutencaoById);

//idItens, motivo, dataInic, data_etorno, responsavel 

router.post('/:idItens/:motivo/:dataInic/:dataRetorno/:responsavel', manutencaoController.postManutencao);

router.put('/:idManutencao/:motivo/:dataInic/:dataRetorno/:responsavel', manutencaoController.putManutencao);

router.delete('/:id', manutencaoController.deleteManutencao);


module.exports = router;
