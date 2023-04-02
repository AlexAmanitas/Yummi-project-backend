const express = require('express');

const router = express.Router();

const { validateBody, auth } = require('../../middlewares');

const {
  contactPostShema,
  contactPutShema,
  contactPatchShema,
} = require('../../schemas/contacts');

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

router.get('/:id', auth, getRecipeById);

router.post('/favorite', auth, addFavoriteRecipes);

router.delete('/favorite', auth, removeFavoriteRecipes);

// router.post('/', auth, validateBody(contactPostShema), add);

// router.delete('/:contactId', auth, deleteById);

// router.put('/:contactId', auth, validateBody(contactPutShema), updateById);

// router.patch(
//   '/:contactId/favorite',
//   auth,
//   validateBody(contactPatchShema),
//   updateStatus
// );

module.exports = router;
