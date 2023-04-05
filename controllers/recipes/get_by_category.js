const { HttpError, ctrlWrapper } = require('../../helpers');
const Recipe = require('../../models/recipe');
const Category = require('../../models/category');
const Ingredient = require('../../models/ingredient');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const getRecipesByCategory = async (req, res) => {
  const { ingredient, category, title, page = 1, limit = 8 } = req.query;

  const queryParams = {};

  if (category) {
    const categories = await Category.find({ _id: category });
    queryParams.category = categories[0].name;
  }
  if (title) queryParams.title = { $regex: new RegExp(`${title}`, 'i') };
  if (ingredient) {
    const ingredients = await Ingredient.findOne({ ttl: ingredient }).select(
      '_id'
    );
    const ingredientId = ingredients._id.toHexString();
    queryParams.ingredients = {
      $elemMatch: { id: ObjectId(ingredientId) },
    };
  }

  const paginationParams = { skip: (page - 1) * limit, limit: +limit };
  console.log('QUERY', queryParams, page, limit);

  const data = await Recipe.find(queryParams, '', paginationParams);
  if (!data) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data,
  });
};

module.exports = ctrlWrapper(getRecipesByCategory);
