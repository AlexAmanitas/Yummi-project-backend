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
  const { id, quantity, unit } = req.body;
  const ingredient = await Ingredient.findOne(ObjectId(id));
  const user = await User.findOne(_id);

  const availability = await User.find({ shopingList: { $elemMatch: { id } } });
  if (availability.length === 0) {
    await User.updateOne(
      { _id },
      {
        $push: {
          shopingList: {
            id,
            name: ingredient.ttl,
            quantity,
            unit,
            image: ingredient.thb,
          },
        },
      }
    );
  } else {
    const quanty = availability[0].shopingList.find(
      item => item.id === id
    ).quantity;
    const newQuantity = quantity + quanty;
    console.log(newQuantity);
    await User.updateOne(
      { _id, 'shopingList.id': id },
      { $set: { 'shopingList.$.quantity': quantity + quanty } },
      { new: true }
    );
  }

  res.status(201).json({
    status: 'success',
    code: 201,
    data: { user: user.shopingList },
  });
};

const removeShopingList = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  await User.updateOne({ _id }, { $pull: { shopingList: { id } } });

  res.status(200).json({
    status: 'success',
    code: 200,
  });
};

module.exports = {
  getShopingList: ctrlWrapper(getShopingList),
  addShopingList: ctrlWrapper(addShopingList),
  removeShopingList: ctrlWrapper(removeShopingList),
};