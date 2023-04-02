const { model, Schema } = require('mongoose');

const recipeShema = new Schema({
  title: {
    type: String,
  },
  category: {
    type: String,
  },
  area: {
    type: String,
  },
  instructions: {
    type: String,
  },
  description: {
    type: String,
  },
  thumb: {
    type: String,
  },
  preview: {
    type: String,
  },
  time: {
    type: String,
  },
  popularity: {
    type: Number,
  },
  favorites: {
    type: Array,
  },
  likes: {
    type: Array,
  },
  youtube: {
    type: String,
  },
  tags: {
    type: Array,
  },
  ingredients: {
    type: Array,
  },
});

const Recipe = model('recipe', recipeShema);

module.exports = Recipe;
