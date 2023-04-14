const { HttpError, ctrlWrapper } = require('../../helpers');
const Recipe = require('../../models/recipe');
const User = require('../../models/user');
const { sendMotivation } = require('../../socket');

const addFavoriteRecipes = async (req, res) => {
  const { id } = req.body;
  const { _id } = req.user;

  const user = await User.findById(_id);

  if (user.favorites.length === 0) {
    sendMotivation(_id, 'You’ve added first recipe to your favorites!');
  }

  await User.updateOne({ _id }, { $addToSet: { favorites: id } });

  const data = await Recipe.findOne({ _id: id });
  console.log('Favorites');
  if (!data) {
    throw HttpError(404, 'Not found');
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data,
  });
};

module.exports = ctrlWrapper(addFavoriteRecipes);
