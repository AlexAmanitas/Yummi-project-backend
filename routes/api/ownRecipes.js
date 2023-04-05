const express = require('express');

const router = express.Router();

const { auth, validateBody } = require('../../middlewares');

const {
  getOwnRecipes,
  addOwnRecipes,
  removeOwnRecipes,
} = require('../../controllers/ownRecipes');

router.get('/', auth, getOwnRecipes);
router.post('/', auth, addOwnRecipes);
router.delete('/', auth, removeOwnRecipes);

module.exports = router;
