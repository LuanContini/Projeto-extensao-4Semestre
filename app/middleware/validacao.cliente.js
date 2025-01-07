const Joi = require("joi");

module.exports.validarCliente = (req, res, next) => {
  const schema = Joi.object({
    nome: Joi.string().min(3).max(50).required().messages({
      "string.base": "O nome deve ser uma string.",
      "string.min": "O nome deve ter pelo menos 3 caracteres.",
      "string.max": "O nome deve ter no máximo 50 caracteres.",
      "any.required": "O nome é obrigatório."
    }),
    cpf: Joi.string().length(11).pattern(/^\d+$/).required().messages({
      "string.base": "O CPF deve ser uma string.",
      "string.length": "O CPF deve ter exatamente 11 caracteres.",
      "string.pattern.base": "O CPF deve conter apenas números.",
      "any.required": "O CPF é obrigatório."
    }),
    telefone: Joi.string().length(11).pattern(/^\d+$/).required().messages({
      "string.base": "O telefone deve ser uma string.",
      "string.length": "O telefone deve ter exatamente 11 caracteres.",
      "string.pattern.base": "O telefone deve conter apenas números.",
      "any.required": "O telefone é obrigatório."
    }),
    email: Joi.string().email().min(5).max(50).required().messages({
      "string.base": "O e-mail deve ser uma string.",
      "string.email": "O e-mail deve ser válido.",
      "string.min": "O e-mail deve ter pelo menos 5 caracteres.",
      "string.max": "O e-mail deve ter no máximo 50 caracteres.",
      "any.required": "O e-mail é obrigatório."
    })
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({ err: error.details[0].message });
  }
  else next();
  
};
