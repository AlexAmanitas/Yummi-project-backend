const Joi = require('joi');

const IngredientSchema = Joi.object({
  id: Joi.string()
    .required()
    .messages({ 'any.required': 'missing field ingredients id' }),
  quantity: Joi.number()
    .required()
    .messages({ 'any.required': 'missing field ingredients id' }),
  unit: Joi.string()
    .required()
    .messages({ 'any.required': 'missing field ingredients unit' }),
});

module.exports = IngredientSchema;
