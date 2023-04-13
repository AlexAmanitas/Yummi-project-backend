const { HttpError, ctrlWrapper } = require('../../helpers');
const Recipe = require('../../models/recipe');
const User = require('../../models/user');
const io = require('../../socket');

const addFavoriteRecipes = async (req, res) => {
  const { id } = req.body;
  const { _id } = req.user;
  const user = await User.findById(_id);
  await User.updateOne({ _id }, { $addToSet: { favorites: id } });

  const data = await Recipe.findOne({ _id: id });
  console.log('Favorites');
  if (!data) {
    throw HttpError(404, 'Not found');
  }
  if (user.favorites.length === 0) {
    io.emit('motivation', {
      favorite: data.title,
      message: 'You’ve added first item to your shopping list!',
    });
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data,
  });
};

module.exports = ctrlWrapper(addFavoriteRecipes);
