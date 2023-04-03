const { HttpError, ctrlWrapper } = require('../../helpers');
const Ingredient = require('../../models/ingredient');

const getIngredientsList = async (req, res) => {
  const data = await Ingredient.find();
  if (!data) {
    throw HttpError(404, 'Not found');
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data,
  });
};

module.exports = ctrlWrapper(getIngredientsList);
