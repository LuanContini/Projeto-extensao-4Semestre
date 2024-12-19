const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuariosController");

router.get("/", usuarioController.getUsuarios);
//router.get("/:id", usuarioController.getUsuariosById);

router.post('/:nome/:cpf/:telefone/:email/:senha/:nasc/:tipo', usuarioController.postUsuario);

router.put('/:idUsuario/:nome/:cpf/:telefone/:email/:senha/:nasc/:tipo', usuarioController.putUsuario);


router.delete('/:idUsuario', usuarioController.deleteUsuario);

// nome,
// cpf,
// telefone,
// email,
// senha,
// nasc,
// tipo
module.exports = router;
