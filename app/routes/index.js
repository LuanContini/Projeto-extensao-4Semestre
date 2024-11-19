const express = require('express');

const router = express.Router();

const itemRoute = require('./item.routes');

router.use('/itens', itemRoute);

module.exports = router;