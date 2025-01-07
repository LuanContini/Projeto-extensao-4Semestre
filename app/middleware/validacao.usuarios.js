const Joi = require("joi");

module.exports.validarUsuario = (req, res, next) => {
  const schema = Joi.object({
    nome: Joi.string().min(5).required().messages({
      "string.base": "O nome deve ser uma string.",
      "string.min": "O nome deve ter pelo menos 5 caracteres.",
      "any.required": "O nome é obrigatório."
    }),
    cpf: Joi.string()
      .pattern(/^\d{11}$/)
      .required()
      .messages({
        "string.pattern.base": "O CPF deve ter exatamente 11 dígitos numéricos.",
        "any.required": "O CPF é obrigatório."
      }),
    telefone: Joi.string()
      .pattern(/^\d{10,11}$/)
      .required()
      .messages({
        "string.pattern.base": "O telefone deve ter 10 ou 11 dígitos.",
        "any.required": "O telefone é obrigatório."
      }),
    email: Joi.string().email().required().messages({
      "string.email": "O e-mail deve ser válido.",
      "any.required": "O e-mail é obrigatório."
    }),
    senha: Joi.string().min(8).required().messages({
      "string.min": "A senha deve ter pelo menos 8 caracteres.",
      "any.required": "A senha é obrigatória."
    }),
    nasc: Joi.date().iso().min('1970-01-01').required().messages({
      "date.format": "A data de nascimento deve estar no formato ISO (YYYY-MM-DD).",
      "any.required": "A data de nascimento é obrigatória.",
      "date.min": "A data de nascimento deve ser maior que 1970"
    }),
    tipo: Joi.string()
      .valid("admin", "user")
      .required()
      .messages({
        "any.only": "O tipo deve ser 'admin' ou 'user'.",
        "any.required": "O tipo é obrigatório."
      })
  });

  const { error } = schema.validate(req.body);

  if (error) {
    console.log("Erro de validação:", error.details[0].message);
    res.status(400).send({ err: error.details[0].message });
  } else next();
  
};
