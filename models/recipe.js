const { Schema, model } = require('mongoose');
// const { handleMongooseError } = require('../helpers');

const recipeSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId },
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    instructions: {
      type: String,
      required: [true, 'Instructions is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    thumb: {
      type: String,
    },
    preview: {
      type: String,
    },
    time: {
      type: String,
      required: [true, 'Cooking time is required'],
    },
    popularity: {
      type: Number,
    },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    likes: [Schema.Types.ObjectId],
    youtube: {
      type: String,
    },
    tags: [String],
    ingredients: {
      type: [{ id: Schema.Types.ObjectId, measure: String }],
      required: [true, 'Ingredients is required'],
      _id: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// recipeSchema.post('save', handleMongooseError);

const Recipe = model('recipe', recipeSchema);

module.exports = Recipe;
