const { HttpError, ctrlWrapper } = require('../../helpers');
const Recipe = require('../../models/recipe');

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  console.log(id);

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

module.exports = ctrlWrapper(getRecipeById);
