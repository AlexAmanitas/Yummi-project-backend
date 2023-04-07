const { HttpError, ctrlWrapper } = require('../../helpers');

const Recipe = require('../../models/recipe');

// const mainPage = async (req, res) => {
//   const array1 = await Recipe.find({ category: 'Breakfast' }, '', {
//     limit: 4,
//   });
//   const array2 = await Recipe.find({ category: 'Miscellaneous' }, '', {
//     limit: 4,
//   });
//   const array3 = await Recipe.find({ category: 'Chicken' }, '', {
//     limit: 4,
//   });
//   const array4 = await Recipe.find({ category: 'Dessert' }, '', {
//     limit: 4,
//   });

//   if (!array1 || !array2 || !array3 || !array4) {
//     throw HttpError(404, 'Not found');
//   }

//   const data = [...array1, ...array2, ...array3, ...array4];
//   res.status(200).json({
//     status: 'success',
//     code: 200,
//     data,
//   });
// };

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
