const Joi = require("joi");

module.exports.validacaoItens = (req, res, next) => {
  const itemSchema = Joi.object({
    codBarras: Joi.string().required(),
    nome: Joi.string().min(5).required(),
    categoria: Joi.string().min(5).required(),
    precoGrupo: Joi.number().positive().required(),
  });

  // No controller:
  const { error } = itemSchema.validate(req.params);
  console.log(error);
  if (error) next(error);
  next();
};
