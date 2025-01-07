const Joi = require("joi");

module.exports.validarContrato = (req, res, next) => {
  const schema = Joi.object({
    nome: Joi.string().min(5).required(),
    categoria: Joi.string().min(5).required(),
    precoGrupo: Joi.number().positive().required(),
  });

  // No controller:
  const { error } = schema.validate(req.body);
  console.log(error);

  if (error) res.status(400).send({'err:': error.details[0].message });
  else next();
  
};
