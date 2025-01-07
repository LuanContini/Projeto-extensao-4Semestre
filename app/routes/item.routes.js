const express = require("express");
const router = express.Router();

const itemController = require("../controllers/itensController");
const { validarItem } = require("../middleware/validacao.item");

router.get("/", itemController.getItens);
router.get("/:id", itemController.getGrupoById);

//cod_barras, idGrupo, nome, categoria, preco_loca,
router.post("/:nome/:categoria/:precoGrupo", validarItem, itemController.postItem);

router.put('/:nome/:categoria/:precoGrupo/:idGrupo', itemController.putItem);

router.delete('/:id', itemController.deleteItem);

router.delete('/grupo/:id', itemController.deleteGrupo);

module.exports = router;
