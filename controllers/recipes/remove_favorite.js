const { HttpError, ctrlWrapper } = require('../../helpers');
const Recipe = require('../../models/recipe');
const User = require('../../models/user');

const removeFavoriteRecipes = async (req, res) => {
  const { id } = req.params;

  const { _id } = req.user;

  await User.updateOne({ _id }, { $pull: { favorites: id } });

  const data = await Recipe.findOne({ _id: id });

  if (!data) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data,
  });
};

module.exports = ctrlWrapper(removeFavoriteRecipes);
