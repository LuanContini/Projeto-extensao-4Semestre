const Joi = require("joi");

module.exports.validarUsuario = (req, res, next) => {
  // Define o schema de validação
  const schema = Joi.object({
    nome: Joi.string().min(2).required().messages({
      "string.base": "O nome deve ser uma string.",
      "string.min": "O nome deve ter pelo menos 5 caracteres.",
      "any.required": "O nome é obrigatório."
    }),
    senha: Joi.string().min(8).messages({
      "string.min": "A senha deve ter pelo menos 8 caracteres."
    }),
    cpf: Joi.string()
      .pattern(/^\d{11}$/)
      .required()
      .messages({
        "string.pattern.base": "O CPF deve ter exatamente 11 dígitos numéricos.",
        "any.required": "O CPF é obrigatório."   
      }),
    email: Joi.string().email().required().messages({
      "string.email": "O e-mail deve ser válido.",
      "any.required": "O e-mail é obrigatório."
    }),
    telefone: Joi.string()
      .pattern(/^\d{10,11}$/)
      .required()
      .messages({
        "string.pattern.base": "O telefone deve ter 10 ou 11 dígitos.",
        "any.required": "O telefone é obrigatório."
      }),    
    dataNasc: Joi.date().iso().min('1970-01-01').required().messages({
      "date.format": "A data de nascimento deve estar no formato ISO (YYYY-MM-DD).",
      "any.required": "A data de nascimento é obrigatória.",
      "date.min": "A data de nascimento deve ser maior que 1970"
    }),
    tipo: Joi.string()
      .valid("Administrador", "Operador")
      .required()
      .messages({
        "any.only": "O tipo deve ser 'Administrador' ou 'Operador'.",
        "any.required": "O tipo é obrigatório."
      }),
    imagem: Joi.any().allow(null, '').optional()
  });

  // Adiciona o contexto com o método HTTP
  const { error } = schema.validate(req.body, { context: { method: req.method } });

  // Verifica se a validação da senha deve ser feita
  if (req.method === 'POST' || (req.method === 'PUT' && req.body.senha)) {
    const senhaValidation = schema.extract('senha').validate(req.body.senha);
    if (senhaValidation.error) {
      return res.status(400).send({ err: senhaValidation.error.details[0].message });
    }
  }

  if (error) {
    console.log("Erro de validação:", error.details);
    return res.status(400).send({ err: error.details[0].message });
  } else {
    next();
  }
};