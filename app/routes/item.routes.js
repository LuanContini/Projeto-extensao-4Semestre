const express = require("express");
const router = express.Router();

const itemController = require("../controllers/itensController");
const { validacaoItens } = require("../middleware/validacao.itens");

router.get("/", itemController.getItens);
router.get("/:id", itemController.getGrupoById);

//cod_barras, idGrupo, nome, categoria, preco_loca,
router.post("/:codBarras/:nome/:categoria/:precoGrupo", validacaoItens, itemController.postItem);

router.put('/:nome/:categoria/:precoGrupo/:idGrupo', itemController.putItem);

router.delete('/:id', itemController.deleteItem);

module.exports = router;
