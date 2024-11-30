const express = require("express");
const router = express.Router();

const contratosController = require("../controllers/contratosController");

router.get("/", contratosController.getContratos);
router.get("/:id", contratosController.getContratoById);

router.post('/'/*outros dados específicos */, contratosController.postContrato);

router.put('/:id'/*outros dados específicos */, contratosController.putContrato);

router.delete('/:id', contratosController.deleteContrato);


module.exports = router;
