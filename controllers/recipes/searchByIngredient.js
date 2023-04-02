const { HttpError, ctrlWrapper } = require('../../helpers');
const Recipe = require('../../models/recipe');
const Category = require('../../models/category');
const Ingredient = require('../../models/ingredient');

const searchByIngredient = async (req, res) => {
  const { ingredient, page = 1, limit = 8 } = req.query;

  const ingredients = await Ingredient.findOne({ ttl: ingredient }).select(
    '_id'
  );
  // console.log(ingredients);
  const ingredientId = ingredients._id.toHexString();

  // const paginationParams = { skip: (page - 1) * limit, limit: +limit };

  const data = await Recipe.find({
    ingredients: {
      $elemMatch: { id: ObjectId('640c2dd963a319ea671e36ca') },
    },
  });
  if (!data) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data,
  });
};

module.exports = ctrlWrapper(searchByIngredient);
