const Jimp = require('jimp');

const jimp = file => {
  Jimp.read(`${file}`)
    .then(image => {
      return image.resize(250, 250).write(`${file}`);
    })
    .catch(err => console.log(err));
};

module.exports = jimp;
