const express = require('express');

const router = express.Router();

const { auth, validateBody, uploadRecipeImage } = require('../../middlewares');

const RecipeSchema = require('../../schemas/recipes');

const {
  getOwnRecipes,
  addOwnRecipes,
  removeOwnRecipes,
} = require('../../controllers/ownRecipes');

router.get('/', auth, getOwnRecipes);

router.post(
  '/',
  auth,
  uploadRecipeImage.single('thumb'),
  validateBody(RecipeSchema),
  addOwnRecipes
);

router.delete('/:id', auth, removeOwnRecipes);

module.exports = router;
