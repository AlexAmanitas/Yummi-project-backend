const User = require('../models/user');
const { HttpError, ctrlWrapper } = require('../helpers');

const bcrypt = require('bcrypt');

// const gravatar = require('gravatar');

const jwt = require('jsonwebtoken');

const path = require('path');
const fs = require('fs/promises');

const uuid = require('uuid');

const { jimp } = require('../middlewares');

const { sendEmail } = require('./emailServise');

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email in use');
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  // const avatarUrl = gravatar.url(email, { s: '200', r: 'pg', d: '404' });
  const verificationToken = uuid.v4();
  await User.create({
    email,
    password: hashPassword,
    avatarURL: avatarUrl,
    subscription: 'starter',
    verificationToken: verificationToken,
  });

  sendEmail('gotvald@yahoo.com', verificationToken);
  // sendEmail(user.email, verificationToken);

  res.status(201).json({
    user: {
      email,
      avatarURL: avatarUrl,
      subscription: 'starter',
      verificationToken: verificationToken,
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
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2d' });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user: {
      email,
      subscription: 'starter',
    },
  });
};

const logOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};
const getCurrentUser = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  });
};

const updateUserStatus = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(_id, { subscription });
  res.status(200).json({
    data: { user },
  });
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
  getCurrentUser: ctrlWrapper(getCurrentUser),
  updateUserStatus: ctrlWrapper(updateUserStatus),
  updateAvatar: ctrlWrapper(updateAvatar),
  userVerification: ctrlWrapper(userVerification),
  resendEmail: ctrlWrapper(resendEmail),
};
