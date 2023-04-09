const { HttpError } = require('../helpers');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  try {
    if (bearer !== 'Bearer') {
      throw HttpError(401, 'Not authorized');
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    console.log(id);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw HttpError(401, 'Not authorized');
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === 'jwt expired' || error.message === 'invalid token') {
      error.status = 401;
    }

    next(error);
  }
};

module.exports = auth;
