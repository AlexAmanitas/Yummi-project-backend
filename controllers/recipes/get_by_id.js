const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { HttpError, ctrlWrapper } = require('../../helpers');
const Recipe = require('../../models/recipe');
const User = require('../../models/user');

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const user = await User.findOne({ _id });
    const isFavorite = user.favorites.includes(id);
    const recipe = await Recipe.aggregate([
      {
        $match: {
          _id: ObjectId(id),
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
    ]);
    if (!recipe || recipe.length === 0) {
      throw HttpError(404, 'Not found');
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      data: { ...recipe[0], isFavorite },
    });
  } catch (error) {
    throw HttpError(404, 'Not found');
  }
};

module.exports = ctrlWrapper(getRecipeById);
