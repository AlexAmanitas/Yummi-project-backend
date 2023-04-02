const { HttpError, ctrlWrapper } = require('../../helpers');
const Recipe = require('../../models/recipe');
const User = require('../../models/user');

const addFavoriteRecipes = async (req, res) => {
  const { id } = req.body;

  const { _id } = req.user;
  console.log(id, typeof _id);
  await User.updateOne({ _id }, { $push: { favorites: id } });

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

module.exports = ctrlWrapper(addFavoriteRecipes);
