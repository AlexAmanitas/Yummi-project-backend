const multer = require('multer');
const path = require('path');
// const jimp = require('./jimp');

const tempDir = path.join(__dirname, '../', 'tmp');
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    // jimp(file.path);
    cb(null, file.originalname);
  },
  limits: { fileSize: 5000 },
});

const upload = multer({ storage: multerStorage });

module.exports = upload;
