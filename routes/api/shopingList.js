const express = require('express');
const router = express.Router();
const { auth } = require('../../middlewares');

const {
  getShopingList,
  addShopingList,
  removeShopingList,
} = require('../../controllers/shopingList');

router.get('/', auth, getShopingList);
router.post('/', auth, addShopingList);
router.delete('/', auth, removeShopingList);

module.exports = router;
