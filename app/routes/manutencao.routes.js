const express = require("express");
const router = express.Router();

const manutencaoController = require("../controllers/manutencaoController");

router.get("/", manutencaoController.getManutencao);
router.get("/:id", manutencaoController.getManutencaoById);

router.put('/:id'/*outros campos*/, manutencaoController.putManutencao);

router.delete('/:id', manutencaoController.deleteManutencao);


module.exports = router;
