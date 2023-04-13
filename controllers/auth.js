const User = require('../models/user');
const { HttpError, ctrlWrapper } = require('../helpers');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email in use');
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarUrl =
    'https://res.cloudinary.com/dsseiacfv/image/upload/v1680621422/avatars/rgvildvqnsh1qqyiibhx.jpg';

  await User.create({
    name,
    email,
    password: hashPassword,
    avatar: avatarUrl,
  });
  const registerUser = await User.findOne({ email });
  const payload = { id: registerUser._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '5d' });
  await User.findByIdAndUpdate(registerUser._id, { token });
  res.status(201).json({
    token,
    user: {
      id: registerUser._id,
      name,
      email,
      avatar: avatarUrl,
    },
  });
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const passCompare = bcrypt.compareSync(password, user.password);
  if (!passCompare) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const payload = { id: user._id };
  console.log(payload);
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '5d' });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email,
      avatar: user.avatar,
    },
  });
};

const logOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

module.exports = {
  register: ctrlWrapper(register),
  logIn: ctrlWrapper(logIn),
  logOut: ctrlWrapper(logOut),
};
