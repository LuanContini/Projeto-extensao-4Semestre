const express = require('express');
const router = express.Router();

const clientesController = require('../controllers/clientesControllers');

const validacaoCliente = require('../middleware/validacao.cliente');


//GET
router.get('/', clientesController.getClientes);
router.get('/:id', clientesController.getClienteById);

//INSERT
router.post('/:nome/:telefone/:email/:observacao/:tipo/:cpf/:cnpj', validacaoCliente.validarCliente, clientesController.postCliente);

//UPDATE
router.put('/:idCliente/:nome/:telefone/:imagem/:email/:observacao/:tipo/:cpf/:cnpj', clientesController.putCliente);

//DELETE
router.delete('/:id', clientesController.deleteCliente);


module.exports = router;