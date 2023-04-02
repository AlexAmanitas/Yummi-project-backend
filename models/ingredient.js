const { model, Schema } = require('mongoose');

const ingredientSchema = new Schema({
  ttl: String,
  desc: String,
  t: String,
  thb: String,
});

const Ingredient = model('ingredient', ingredientSchema);

module.exports = Ingredient;
