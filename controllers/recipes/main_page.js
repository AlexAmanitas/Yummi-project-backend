const { HttpError, ctrlWrapper } = require('../../helpers');
const Recipe = require('../../models/recipe');

const mainPage = async (req, res) => {
  const data = await Recipe.aggregate([
    {
      $match: {
        $or: [
          { category: 'Breakfast' },
          { category: 'Miscellaneous' },
          { category: 'Chicken' },
          { category: 'Dessert' },
        ],
      },
    },
    {
      $group: {
        _id: '$category',
        data: { $push: '$$ROOT' },
      },
    },
    {
      $project: {
        data: { $slice: ['$data', 4] },
      },
    },
    { $unwind: '$data' },
    { $replaceRoot: { newRoot: '$data' } },
  ]);
  if (!data || data.length === 0) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data,
  });
};

module.exports = ctrlWrapper(mainPage);
