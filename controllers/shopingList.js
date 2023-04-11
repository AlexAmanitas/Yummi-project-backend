const User = require('../models/user');
const Ingredient = require('../models/ingredient');
const { HttpError, ctrlWrapper } = require('../helpers');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

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
  // const { id, ttl, thb, recipe, measure } = req.body;
  // const ingredient = await Ingredient.findOne(ObjectId(id));
  // console.log(id, ttl, thb, recipe, measure);
  // const user = await User.findOne(_id);

  // user.shopingList = { ...req.body };
  await User.updateOne({ _id }, { $push: { shopingList: { ...req.body } } });

  // const availability = await User.find({ shopingList: { $elemMatch: { id } } });
  // if (availability.length === 0) {
  //   await User.updateOne(
  //     { _id },
  //     {
  //       $push: {
  //         shopingList: {
  //           id,
  //           name: ingredient.ttl,
  //           quantity,
  //           unit,
  //           image: ingredient.thb,
  //         },
  //       },
  //     }
  //   );
  // } else {
  //   const quanty = availability[0].shopingList.find(
  //     item => item.id === id
  //   ).quantity;
  //   const newQuantity = quantity + quanty;
  //   console.log(newQuantity);
  //   await User.updateOne(
  //     { _id, 'shopingList.id': id },
  //     { $set: { 'shopingList.$.quantity': quantity + quanty } },
  //     { new: true }
  //   );
  // }

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
