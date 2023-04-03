const { HttpError, ctrlWrapper } = require('../../helpers');
const Recipe = require('../../models/recipe');

const getPopularRecipes = async (req, res) => {
  const recipes = await Recipe.find();

  console.log('POPULAR', recipes[5].favorites.length);
  const data = recipes.sort((a, b) => {
    return b.favorites.length - a.favorites.length;
  });

  if (!data) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data,
  });
};

module.exports = ctrlWrapper(getPopularRecipes);
