const User = require('../models/user');
const { HttpError, ctrlWrapper } = require('../helpers');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const path = require('path');
const fs = require('fs/promises');

const { jimp } = require('../middlewares');

const { sendEmail } = require('./emailServise');

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
  console.log(payload);
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '5d' });
  await User.findByIdAndUpdate(registerUser._id, { token });

  // sendEmail('gotvald@yahoo.com', verificationToken);
  // sendEmail(user.email, verificationToken);

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
  const passCompare = bcrypt.compareSync(password, user.password);
  if (!user || !passCompare) {
    throw HttpError(401, 'Email or password is wrong');
  }
  // if (!user.verify) {
  //   throw HttpError(401, 'Email not verify');
  // }
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

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const avatarFileName = `${_id}_${originalname}`;
  const resultUpload = path.join('public', 'avatars', avatarFileName);

  try {
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join('public', 'avatars', avatarFileName);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
  }
  jimp(resultUpload);
};

const userVerification = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken: verificationToken });
  if (!user) {
    throw HttpError(404, 'User not found');
  }
  await User.findOneAndUpdate(
    { email: user.email },
    {
      verificationToken: null,
      verify: true,
    }
  );
  res.status(200).json({
    status: 'OK',
    message: 'Verification successful',
  });
};

const resendEmail = async (req, res) => {
  const user = await User.findOne(req.body);
  if (!user.verificationToken) {
    throw HttpError(409, 'Email has already been verified ');
  }
  sendEmail('gotvald@yahoo.com', user.verificationToken);
  // sendEmail(user.email, user.verificationToken);

  res.status(200).json({
    status: 'OK',
    message: 'Verification email sent',
  });
};

module.exports = {
  register: ctrlWrapper(register),
  logIn: ctrlWrapper(logIn),
  logOut: ctrlWrapper(logOut),

  updateAvatar: ctrlWrapper(updateAvatar),
  userVerification: ctrlWrapper(userVerification),
  resendEmail: ctrlWrapper(resendEmail),
};
