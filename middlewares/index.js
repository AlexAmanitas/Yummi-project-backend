const validateBody = require('./validateBody');
const auth = require('./auth');
const upload = require('./multer');
const jimp = require('./jimp');

module.exports = {
  validateBody,
  auth,
  upload,
  jimp,
};
