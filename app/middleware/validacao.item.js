const Joi = require("joi");

module.exports.validarItem = (req, res, next) => {
  const schema = Joi.object({
    nome: Joi.string().min(5).max(100).required().messages({
      "string.base": "O nome deve ser uma string.",
      "string.min": "O nome deve ter pelo menos 5 caracteres.",
      "string.max": "O nome deve ter no máximo 100 caracteres.",
      "any.required": "O nome é obrigatório."
    }),
    categoria: Joi.string().min(5).max(100).required().messages({
      "string.base": "A categoria deve ser uma string.",
      "string.min": "A categoria deve ter pelo menos 5 caracteres.",
      "string.max": "A categoria deve ter no máximo 100 caracteres.",
      "any.required": "A categoria é obrigatória."
    }),
    precoGrupo: Joi.number().positive().precision(2).required().messages({
      "number.base": "O preço do grupo deve ser um número.",
      "number.positive": "O preço do grupo deve ser positivo.",
      "number.precision": "O preço do grupo deve ter no máximo 2 casas decimais.",
      "any.required": "O preço do grupo é obrigatório."
    }),
    quantidadeItens: Joi.number().allow(null, "")
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({ err: error.details[0].message });
  }
  else next();  
};
