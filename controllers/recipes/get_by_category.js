const { HttpError, ctrlWrapper } = require('../../helpers');
const Recipe = require('../../models/recipe');
const Category = require('../../models/category');
const Ingredient = require('../../models/ingredient');

const getRecipesByCategory = async (req, res) => {
  const { ingredient, category, title, page = 1, limit = 8 } = req.query;

  const queryParams = {};
  console.log('SEARCH');

  if (category) {
    const categories = await Category.find({ _id: category });
    queryParams.category = categories[0].name;
  }
  if (title)
    queryParams.title = {
      $regex: new RegExp(`${title.split('').join('.*')}`, 'i'),
    };

  if (ingredient) {
    const ingredientId = await Ingredient.findOne({
      ttl: {
        $regex: new RegExp(`${ingredient.split('').join('.*')}`, 'i'),
      },
    }).select('_id');
    queryParams.ingredients = {
      $elemMatch: { id: ingredientId },
    };
  }

  const paginationParams = { skip: (page - 1) * limit, limit: +limit };

  const search = await Recipe.find(queryParams);
  const data = await Recipe.find(queryParams, '', paginationParams);
  if (!data) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    total: search.length,
    page: +page,
    limit: +limit,
    total: search.length,
    page: +page,
    limit: +limit,
    data,
  });
};

module.exports = ctrlWrapper(getRecipesByCategory);
