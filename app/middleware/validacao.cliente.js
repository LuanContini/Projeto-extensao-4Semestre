const Joi = require('joi');

module.exports.validarCliente = (req, res, next) => {
    const schema = Joi.object({
        nome: Joi.string().min(3).max(50).required(),
        cpf: Joi.string().min(15).max(15).required(),
        telefone: Joi.string().min(15).max(15).required(),
        email: Joi.string().min(20).max(50).required(),
    });

    const {err} = schema.validate(req.params);

    if(err) {
        res.status(400).send({ 'err': err });
    }

    next();
};