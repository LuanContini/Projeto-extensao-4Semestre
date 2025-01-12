const express = require("express");
const router = express.Router();

const itemController = require("../controllers/itensController");
const { validarItem } = require("../middleware/validacao.item");
const auth = require("../middleware/auth.usuario");

router.get("/", itemController.getItens);
router.get("/criar-itens", auth.checarAuthAdmin, itemController.criarGrupo);
router.get("/:id", itemController.getGrupoById);
router.get("/editar/:id", auth.checarAuthAdmin, itemController.editarGrupo);

//cod_barras, idGrupo, nome, categoria, preco_loca,
router.post("/criar-grupo", auth.checarAuthAdmin, validarItem, itemController.postItem);

router.put('/:idGrupo', auth.checarAuthAdmin, itemController.putItem);

router.delete('/:id', auth.checarAuthAdmin, itemController.deleteItem);

router.delete('/grupo/:id', auth.checarAuthAdmin, itemController.deleteGrupo);

module.exports = router;
