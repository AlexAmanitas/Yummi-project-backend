const { HttpError, ctrlWrapper } = require('../../helpers');
const Recipe = require('../../models/recipe');

const getPopularRecipes = async (req, res) => {
  const recipes = await Recipe.find();

  console.log('POPULAR', recipes[5].favorites.length);
  const result = recipes.sort((a, b) => {
    return b.favorites.length - a.favorites.length;
  });

  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    result,
  });
};

module.exports = ctrlWrapper(getPopularRecipes);
