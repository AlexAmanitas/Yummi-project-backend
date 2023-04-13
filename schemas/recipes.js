const Joi = require('joi');

const RecipeSchema = Joi.object({
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
  ingredients: Joi.array()
    // .required()
    .items(
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

module.exports = RecipeSchema;
