const { HttpError, ctrlWrapper } = require('../../helpers');

const Category = require('../../models/category');

const categoryList = async (req, res) => {
  const data = await Category.find();
  if (!data) {
    throw HttpError(404, 'Not found');
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data,
  });
};

module.exports = ctrlWrapper(categoryList);
