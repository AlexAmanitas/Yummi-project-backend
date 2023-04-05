const User = require('../models/user');
const { HttpError, ctrlWrapper } = require('../helpers');

const getOwnRecipes = async (req, res) => {};
const addOwnRecipes = async (req, res) => {};
const removeOwnRecipes = async (req, res) => {};

module.exports = {
  getOwnRecipes: ctrlWrapper(getOwnRecipes),
  addOwnRecipes: ctrlWrapper(addOwnRecipes),
  removeOwnRecipes: ctrlWrapper(removeOwnRecipes),
};
