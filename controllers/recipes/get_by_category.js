const { HttpError, ctrlWrapper } = require('../../helpers');
const Recipe = require('../../models/recipe');
const Category = require('../../models/category');
const Ingredient = require('../../models/ingredient');

const getRecipesByCategory = async (req, res) => {
  const { category, title, page = 1, limit = 8 } = req.query;

  const queryParams = {};
  if (category) {
    const categories = await Category.find({ _id: category });
    queryParams.category = categories[0].name;
  }
  if (title) queryParams.title = title;

  const paginationParams = { skip: (page - 1) * limit, limit: +limit };
  // console.log('QUERY', queryParams, page, limit);

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
