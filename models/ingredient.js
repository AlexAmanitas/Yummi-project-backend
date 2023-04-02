const { model, Schema } = require('mongoose');

const ingredientSchema = new Schema({
  ttl: { type: String, required: true },
  desc: { type: String, required: true },
  t: String,
  thb: String,
});

const Ingredient = model('ingredient', ingredientSchema);

module.exports = Ingredient;
