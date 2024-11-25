const express = require('express');
const router = express.Router();

const clientesController = require('../controllers/clientesControllers');


router.get('/', clientesController.getClientes);

module.exports = router;