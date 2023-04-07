const express = require('express');

const router = express.Router();

const { validateBody, auth } = require('../../middlewares');

const {
  categoryList,
  mainPage,
  getRecipeById,
  getRecipesByCategory,
  getIngredientsList,
  getPopularRecipes,
  getFavoriteRecipes,
  addFavoriteRecipes,
  removeFavoriteRecipes,
} = require('../../controllers/recipes');

router.get('/', auth, getRecipesByCategory);

router.get('/categories', auth, categoryList);

router.get('/ingredients', auth, getIngredientsList);

router.get('/main-page', auth, mainPage);

router.get('/popular', auth, getPopularRecipes);

router.get('/favorite', auth, getFavoriteRecipes);

router.get('/id/:id', auth, getRecipeById);

router.post('/favorite', auth, addFavoriteRecipes);

router.delete('/favorite/:id', auth, removeFavoriteRecipes);

module.exports = router;
