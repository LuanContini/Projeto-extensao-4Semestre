const express = require("express");
const router = express.Router();

const itemController = require("../controllers/itensController");

router.get("/", itemController.getItens);
router.get("/:id", itemController.getItensById);

//cod_barras, idGrupo, nome, categoria, preco_loca,
router.post("/:cod_barras/:nome/:categoria/:preco_loca", itemController.postItem);

router.put('/:nome/:categoria/:preco_loca/:idGrupo', itemController.putItem);

router.delete('/:id', itemController.deleteItem);

module.exports = router;
