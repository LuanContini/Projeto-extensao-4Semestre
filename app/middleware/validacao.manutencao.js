const Joi = require("joi");

module.exports.validarManutencao = (req, res, next) => {
  const schema = Joi.object({
    motivo: Joi.string().min(5).required().messages({
      "string.base": "O motivo deve ser uma string.",
      "string.min": "O motivo deve ter pelo menos 5 caracteres.",
      "any.required": "O motivo é obrigatório.",
      "string.empty": "O motivo não pode ser vazio"
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
      "any.required": "O responsável é obrigatório.",
      "string.empty": "O responsável não pode ser vazio"
    }),
    selectedItems: Joi.array().min(1).required().messages({
      "array.base": "Os itens selecionados devem ser um array.",
      "array.min": "Pelo menos um item deve ser selecionado.",
      "any.required": "Os itens selecionados são obrigatórios."
    })
  });

  const { error } = schema.validate(req.body);

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).send({ err: errorMessages });
  } else {
    next();
  }
};