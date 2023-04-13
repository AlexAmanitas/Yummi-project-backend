const User = require('../models/user');
// const Ingredient = require('../models/ingredient');
const { HttpError, ctrlWrapper } = require('../helpers');
const io = require('../socket');

const getShopingList = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findOne(_id);
  if (!user) {
    throw HttpError(404, 'User not found');
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: user.shopingList,
  });
};

const addShopingList = async (req, res) => {
  const { _id } = req.user;
  await User.updateOne({ _id }, { $push: { shopingList: { ...req.body } } });
  io.emit('firstShoppingList', { dato: req.body.ttl });

  res.status(201).json({
    status: 'success',
    code: 201,
    data: { ...req.body },
  });
};

const removeShopingList = async (req, res) => {
  const { _id } = req.user;
  req.body.map(async ({ id, recipe }) => {
    await User.findOneAndUpdate(
      { _id },
      { $pull: { shopingList: { $and: [{ id }, { recipe }] } } }
    );
  });
  res.status(204).json({
    status: 'success',
    code: 204,
  });
};

module.exports = {
  getShopingList: ctrlWrapper(getShopingList),
  addShopingList: ctrlWrapper(addShopingList),
  removeShopingList: ctrlWrapper(removeShopingList),
};
