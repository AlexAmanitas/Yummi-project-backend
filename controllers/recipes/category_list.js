const { HttpError, ctrlWrapper } = require('../../helpers');

const Category = require('../../models/category');

const categoryList = async (req, res) => {
  const result = await Category.find();
  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: result,
  });
};

module.exports = ctrlWrapper(categoryList);
