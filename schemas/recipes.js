const Joi = require('joi');

const recipe = Joi.object({
  title: Joi.string()
    .required()
    .messages({ 'any.required': 'missing field title' }),
  category: Joi.string()
    .required()
    .messages({ 'any.required': 'missing field category' }),
  description: Joi.string()
    .required()
    .messages({ 'any.required': 'missing field description' }),
  instructions: Joi.string()
    .required()
    .messages({ 'any.required': 'missing field category' }),
  time: Joi.string()
    .required()
    .messages({ 'any.required': 'missing field category' }),
  thumb: Joi.string(),
  preview: Joi.string(),
  ingredients: Joi.array().items(
    Joi.object({
      id: Joi.string()
        .required()
        .messages({ 'any.required': 'missing field ingredients id' }),
      measure: Joi.string()
        .required()
        .messages({ 'any.required': 'missing field ingredients measure' }),
    })
  ),
});

const RecipeSchema = {
  recipe,
};
module.exports = RecipeSchema;
