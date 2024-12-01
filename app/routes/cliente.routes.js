const express = require('express');
const router = express.Router();

const clientesController = require('../controllers/clientesControllers');

const { validarCliente } = require('../middleware/validacao.cliente');


router.get('/', clientesController.getClientes);
router.get('/:id', clientesController.getClienteById);

router.post('/:nome/:cpf/:telefone/:email', validarCliente, clientesController.postCliente);

router.put('/:id/:nome/:cpf/:telefone/:email', clientesController.putCliente);

router.delete('/:id', clientesController.deleteCliente);


module.exports = router;