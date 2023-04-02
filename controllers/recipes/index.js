const categoryList = require('./category_list');
const mainPage = require('./main_page');
const getRecipesByCategory = require('./get_by_category');
const getRecipeById = require('./get_by_id');
const getPopularRecipes = require('./get_popular');
const getIngredientsList = require('./ingredient_list');
const getFavoriteRecipes = require('./get_favorite');
const addFavoriteRecipes = require('./add_favorite');
const removeFavoriteRecipes = require('./remove_favorite');

module.exports = {
  getIngredientsList,
  categoryList,
  mainPage,
  getRecipeById,
  getRecipesByCategory,
  getPopularRecipes,
  getFavoriteRecipes,
  addFavoriteRecipes,
  removeFavoriteRecipes,
};
