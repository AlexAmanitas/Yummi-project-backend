const User = require('../models/user');
const { HttpError, ctrlWrapper } = require('../helpers');

const getCurrentUser = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    throw HttpError(404, 'User not found');
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { id: user._id, name: name, email: user.email, avatar: user.avatar },
  });
};

const updateUser = async (req, res) => {
  const { name, avatar } = req.body;
  const { _id } = req.user;
  const updateObject = {};
  if (name) updateObject.name = name;
  if (avatar) updateObject.avatar = avatar;
  const user = await User.findByIdAndUpdate(_id, updateObject);
  res.status(200).json({
    status: 'success',
    code: 200,
    data: { id: user._id, name: name, email: user.email, avatar: user.avatar },
  });
};

const getUserStatistics = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  const createdAt = user.createdAt;
  const currentTime = new Date();
  const timeElapsed = convertMS(currentTime.getTime() - createdAt.getTime());

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      time: timeElapsed,
      favorites: user.favorites.length,
      recipes: user.recipes.length,
      shopigList: user.shopingList,
    },
  });
};

const subscribeUser = async (req, res) => {};

module.exports = {
  getCurrentUser: ctrlWrapper(getCurrentUser),
  updateUser: ctrlWrapper(updateUser),
  getUserStatistics: ctrlWrapper(getUserStatistics),
  subscribeUser: ctrlWrapper(subscribeUser),
};

function convertMS(milliseconds) {
  // const seconds = Math.floor((milliseconds / 1000) % 60);
  // const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  // const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

  // const formatTime = time => (time < 10 ? `0${time}` : time);

  // const result = `${days}d ${formatTime(hours)}h ${formatTime(
  //   minutes
  // )}m ${formatTime(seconds)}s`;

  return days;
}
