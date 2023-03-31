const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const userStatusSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business'),
});

const userVerifySchema = Joi.object({
  email: Joi.string().required(),
});

module.exports = { userSchema, userStatusSchema, userVerifySchema };
