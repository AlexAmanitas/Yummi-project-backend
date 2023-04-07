const { HttpError, ctrlWrapper } = require('../../helpers');
const Recipe = require('../../models/recipe');
const User = require('../../models/user');

const getFavoriteRecipes = async (req, res) => {
  const { page = 1, limit = 4 } = req.query;
  const paginationParams = { skip: (page - 1) * limit, limit: +limit };

  const { _id } = req.user;
  const user = await User.findById(_id);

  const data = await Recipe.find(
    { _id: { $in: user.favorites } },
    '',
    paginationParams
  );
  if (!data) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data,
  });
};

module.exports = ctrlWrapper(getFavoriteRecipes);
