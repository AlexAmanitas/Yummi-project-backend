const { HttpError, ctrlWrapper } = require('../../helpers');
const Recipe = require('../../models/recipe');

const getPopularRecipes = async (req, res) => {
  const recipes = await Recipe.find();

  const result = recipes.sort((a, b) => {
    return b.favorites.length - a.favorites.length;
  });

  if (!result) {
    throw HttpError(404, 'Not found');
  }
  const data = result.slice(0, 5);
  res.status(200).json({
    status: 'success',
    code: 200,
    data,
  });
};

module.exports = ctrlWrapper(getPopularRecipes);
