const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itensController');


router.get('/', itemController.getItens);
router.get('/:id', itemController.getItensByGroup);

module.exports = router;