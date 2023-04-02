const { HttpError, ctrlWrapper } = require('../../helpers');
const Ingredient = require('../../models/ingredient');

const getIngredientsList = async (req, res) => {
  const result = await Ingredient.find();
  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: result,
  });
};

module.exports = ctrlWrapper(getIngredientsList);
