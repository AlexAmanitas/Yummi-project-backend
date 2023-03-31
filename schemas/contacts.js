const Joi = require('joi');

const contactPostShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().default(false),
});
const contactPutShema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

const contactPatchShema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { contactPostShema, contactPutShema, contactPatchShema };
