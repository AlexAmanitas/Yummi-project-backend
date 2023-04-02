const categoryList = require('./category_list');
const mainPage = require('./main_page');
const getRecipesByCategory = require('./get_by_category');
const searchByIngredient = require('./get_by_category');

module.exports = {
  categoryList,
  mainPage,
  searchByIngredient,
  getRecipesByCategory,
};
