const { HttpError, ctrlWrapper } = require('../../helpers');
const Recipe = require('../../models/recipe');

const removeFavoriteRecipes = async (req, res) => {
  res.status(200).json({
    status: 'success',
    code: 200,
  });
};

module.exports = ctrlWrapper(removeFavoriteRecipes);
