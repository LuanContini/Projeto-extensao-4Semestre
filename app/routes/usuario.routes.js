const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuariosController");
const validacaoUsuario = require("../middleware/validacao.usuarios");
const auth = require("../middleware/auth.usuario");


router.get("/", auth.checarAuthAdmin, usuarioController.getUsuarios);
router.get('/login', usuarioController.telaLogin);
router.get("/:id", auth.checarAuthAdmin, usuarioController.getUsuarioById);

router.post("/login", usuarioController.login);
router.post("/login/logout", usuarioController.logout);

router.post('/', auth.checarAuthAdmin, validacaoUsuario.validarUsuario, usuarioController.postUsuario);

router.put('/:idUsuario', auth.checarAuthAdmin, validacaoUsuario.validarUsuario, usuarioController.putUsuario); 

router.delete('/:idUsuario', auth.checarAuthAdmin, usuarioController.deleteUsuario);

// nome,
// cpf,
// telefone,
// email,
// senha,
// nasc,
// tipo
module.exports = router;
