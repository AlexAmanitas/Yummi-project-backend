const express = require('express');

const router = express.Router();

const { auth, validateBody } = require('../../middlewares');

// const IngredientSchema = require('../../schemas/ingredients');

const {
  getShopingList,
  addShopingList,
  removeShopingList,
} = require('../../controllers/shopingList');

router.get('/', auth, getShopingList);
router.post('/', auth, addShopingList);
router.delete('/:id', auth, removeShopingList);

module.exports = router;
