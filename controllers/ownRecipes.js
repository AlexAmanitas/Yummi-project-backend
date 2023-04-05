const User = require('../models/user');
const Recipe = require('../models/recipe');
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
    data: { recipes, count },
  });
};

const addOwnRecipes = async (req, res) => {
  const { _id } = req.user;
  const {
    title,
    thumb,
    description,
    category,
    time,
    instructions,
    ingredients,
  } = req.body;

  const own = await Recipe.create({
    owner: _id,
    title,
    thumb,
    description,
    category,
    time,
    instructions,
    ingredients,
  });
  if (!own) {
    throw HttpError(500, 'Recipe not added');
  }

  res.status(201).json({
    status: 'success',
    code: 201,
  });
};

const removeOwnRecipes = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  console.log(id, _id);
  const recipe = Recipe.findOne({ owner: _id, _id: id }).lean();

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
