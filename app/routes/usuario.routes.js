const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuariosController");
const validacaoUsuario = require("../middleware/validacao.usuarios");
const auth = require("../middleware/auth.usuario");


router.get("/", auth.checarAuth, usuarioController.getUsuarios);

router.post("/login/:nome/:senha", usuarioController.login);
router.post('/:nome/:cpf/:telefone/:email/:senha/:nasc/:tipo', auth.checarAuth, validacaoUsuario.validarUsuario, usuarioController.postUsuario);

router.put('/:idUsuario/:nome/:cpf/:telefone/:email/:senha/:nasc/:tipo', auth.checarAuth, usuarioController.putUsuario);


router.delete('/:idUsuario', auth.checarAuth, usuarioController.deleteUsuario);

// nome,
// cpf,
// telefone,
// email,
// senha,
// nasc,
// tipo
module.exports = router;
