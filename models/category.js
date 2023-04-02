const { model, Schema } = require('mongoose');

const categorySchema = new Schema({
  id: String,
  name: String,
});

const Category = model('category', categorySchema);

module.exports = Category;
