const User = require('../models/user');
// const Ingredient = require('../models/ingredient');
const { HttpError, ctrlWrapper } = require('../helpers');
// const mongoose = require('mongoose');
const { sendMotivation } = require('../socket');
// const ObjectId = mongoose.Types.ObjectId;

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
  console.log('SHOPPING');
  const { _id } = req.user;
  const user = await User.findOne(_id);
  if (user.shopingList.length === 0) {
    sendMotivation(_id, 'You`ve successfully added item to shoping list!');
  }

  await User.updateOne({ _id }, { $push: { shopingList: { ...req.body } } });

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
  const user = await User.findOne(_id);
  if (user.shopingList.length === 1) {
    sendMotivation(_id, 'Your shopping list is empty!');
  }
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
