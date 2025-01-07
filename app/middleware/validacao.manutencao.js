const Joi = require("joi");

module.exports.validarManutencao = (req, res, next) => {
  const schema = Joi.object({
    idItens: Joi.number().positive().required().messages({
      "number.base": "O idItens deve ser um número positivo.",
      "any.required": "O idItens é obrigatório."
    }),
    motivo: Joi.string().min(5).required().messages({
      "string.base": "O motivo deve ser uma string.",
      "string.min": "O motivo deve ter pelo menos 5 caracteres.",
      "any.required": "O motivo é obrigatório."
    }),
    dataInic: Joi.date().min('1900-01-01').iso().required().messages({
      "date.base": "A data de início deve ser uma data válida.",
      "date.min": "A data de início não pode ser anterior a 01-01-1900.",
      "any.required": "A data de início é obrigatória."
    }),
    dataRetorno: Joi.date().min('1900-01-01').iso().required().messages({
      "date.base": "A data de retorno deve ser uma data válida.",
      "date.min": "A data de retorno não pode ser anterior a 01-01-1900.",
      "any.required": "A data de retorno é obrigatória."
    }),
    responsavel: Joi.string().min(1).required().messages({
      "string.base": "O responsável deve ser uma string.",
      "string.min": "O responsável deve ter pelo menos 1 caractere.",
      "any.required": "O responsável é obrigatório."
    })
  });

  const { error } = schema.validate(req.body);

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).send({ err: errorMessages });
  }
  else next();
};
