const Recipe = require('../models/recipe');
const User = require('../models/user');
const { HttpError, ctrlWrapper } = require('../helpers');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const getOwnRecipes = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 8 } = req.query;
  const paginationParams = { skip: (page - 1) * limit, limit: +limit };

  const recipes = await Recipe.aggregate([
    {
      $match: {
        owner: ObjectId(_id),
      },
    },
    {
      $lookup: {
        from: 'ingredients',
        localField: 'ingredients.id',
        foreignField: '_id',
        as: 'ingr_nfo',
      },
    },
    {
      $set: {
        ingredients: {
          $map: {
            input: '$ingredients',
            in: {
              $mergeObjects: [
                '$$this',
                {
                  $arrayElemAt: [
                    '$ingr_nfo',
                    {
                      $indexOfArray: ['$ingr_nfo._id', '$$this.id'],
                    },
                  ],
                },
              ],
            },
          },
        },
      },
    },
    {
      $unset: ['ingr_nfo', 'ingredients.id'],
    },
    {
      $skip: paginationParams.skip,
    },
    {
      $limit: paginationParams.limit,
    },
  ]);

  const count = await Recipe.countDocuments({ owner: ObjectId(_id) });

  // return { recipes, count };

  res.status(200).json({
    status: 'success',
    code: 200,
    data: recipes,
    count,
  });
};

const addOwnRecipes = async (req, res) => {
  const { _id } = req.user;
  const recipeImage = req.file
    ? req.file.path
    : 'https://res.cloudinary.com/dsseiacfv/image/upload/v1680762454/recipeImages/wkv92kkm5wgsmrst8ype.png';

  const own = await Recipe.create({
    owner: _id,
    ...req.body,
    thumb: recipeImage,
  });
  if (!own) {
    throw HttpError(500, 'Recipe not added');
  }
  await User.updateOne({ _id }, { $addToSet: { recipes: own._id } });

  res.status(201).json({
    status: 'success',
    code: 201,
  });
};

const removeOwnRecipes = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const recipe = await Recipe.findOneAndDelete({ _id: id, owner: _id });

  if (!recipe) {
    throw HttpError(404, 'Recipe not found');
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: recipe,
  });
};

module.exports = {
  getOwnRecipes: ctrlWrapper(getOwnRecipes),
  addOwnRecipes: ctrlWrapper(addOwnRecipes),
  removeOwnRecipes: ctrlWrapper(removeOwnRecipes),
};
