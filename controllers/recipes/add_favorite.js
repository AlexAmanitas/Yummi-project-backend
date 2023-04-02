const { HttpError, ctrlWrapper } = require('../../helpers');
const Recipe = require('../../models/recipe');
const User = require('../../models/user');

const addFavoriteRecipes = async (req, res) => {
  const { id } = req.body;

  const { _id } = req.user;
  console.log(id, _id);
  await User.updateOne({ _id }, { $push: { favorites: id } });

  const recipe = await Recipe.findById(id);

  res.status(200).json({
    status: 'success',
    code: 200,
    recipe,
  });
};

module.exports = ctrlWrapper(addFavoriteRecipes);
