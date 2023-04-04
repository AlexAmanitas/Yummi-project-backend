const validateBody = require('./validateBody');
const auth = require('./auth');
const upload = require('./multer');
const jimp = require('./jimp');
const uploadCloud = require('./uploadCloudinary');

module.exports = {
  validateBody,
  auth,
  upload,
  jimp,
  uploadCloud,
};
