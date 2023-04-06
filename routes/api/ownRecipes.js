const express = require('express');

const router = express.Router();

const { auth, validateBody, uploadRecipeImage } = require('../../middlewares');

const RecipeSchema = require('../../schemas/recipes');

const {
  getOwnRecipes,
  addOwnRecipes,
  removeOwnRecipes,
} = require('../../controllers/ownRecipes');

/**
 * @swagger
 * tags:
 *   name: Own Recipes
 *   description: Own Recipes API
 */

/**
 * @swagger
 * /own-recipes:
 *   get:
 *     summary: Get a list of the user's own recipes with pagination
 *     description: Retrieve a list of recipes created by the authenticated user
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Own Recipes
 *     parameters:
 *       - in: query
 *         name: page
 *         description: The page number to retrieve (starting from 1)
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: true
 *       - in: query
 *         name: limit
 *         description: The maximum number of items to return per page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: true
 *     responses:
 *       200:
 *         description: A list of the user's own recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier of the recipe
 *                   title:
 *                     type: string
 *                     description: The title of the recipe
 *                   category:
 *                     type: string
 *                     description: The category of the recipe
 *                   instructions:
 *                     type: string
 *                     description: The instructions for making the recipe
 *                   description:
 *                     type: string
 *                     description: The description of the recipe
 *                   thumb:
 *                     type: string
 *                     description: The URL of the thumbnail image of the recipe
 *                   time:
 *                     type: string
 *                     description: The cooking time for the recipe
 *                   ingredients:
 *                     type: array
 *                     description: The list of ingredients for the recipe
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: The unique identifier of the ingredient
 *                         measure:
 *                           type: string
 *                           description: The measurement for the ingredient
 */
router.get('/', auth, getOwnRecipes);

/**
 * @swagger
 * /own-recipes:
 *   post:
 *     summary: Create a new recipe
 *     tags: [Own Recipes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the recipe
 *                 example: Spaghetti Carbonara
 *               category:
 *                 type: string
 *                 description: The category of the recipe
 *                 example: Pasta
 *               instructions:
 *                 type: string
 *                 description: The instructions for preparing the recipe
 *                 example: 1. Cook spaghetti according to package directions. 2. Fry bacon until crispy. 3. Mix eggs and Parmesan in a bowl. 4. Add spaghetti to bacon and toss until coated. 5. Remove from heat and add egg mixture, stirring quickly. Serve immediately.
 *               description:
 *                 type: string
 *                 description: A brief description of the recipe
 *                 example: This classic Italian dish is perfect for a cozy night in.
 *               thumb:
 *                 type: string
 *                 description: The image URL for the recipe thumbnail
 *                 example: https://www.example.com/spaghetti_carbonara.jpg
 *               time:
 *                 type: integer
 *                 description: The total time required to prepare the recipe in minutes
 *                 example: 30
 *               ingredients:
 *                 type: array
 *                 description: An array of objects containing the ID and measure of each ingredient
 *                 example: [{id: 1, measure: "1 lb spaghetti"}, {id: 2, measure: "6 slices bacon"}, {id: 3, measure: "3 eggs"}, {id: 4, measure: "1/2 cup Parmesan cheese"}]
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the ingredient as listed in the app's database
 *                       example: 1
 *                     measure:
 *                       type: string
 *                       description: The amount or measure of the ingredient required
 *                       example: 1 lb spaghetti
 *     responses:
 *       201:
 *         description: Recipe created successfully
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the request body was invalid
 *                   example: Invalid request body
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the user is not authorized to access the endpoint
 *                   example: Unauthorized
 */
router.post(
  '/',
  auth,
  uploadRecipeImage.single('thumb'),
  validateBody(RecipeSchema),
  addOwnRecipes
);

/**
 * @swagger
 * /own-recipes/:id:
 *   delete:
 *     summary: Delete own recipe
 *     description: Deletes a recipe that belongs to the authenticated user
 *     tags: [Own Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the recipe to delete
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A JSON object representing the deleted recipe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: The title of the deleted recipe.
 *                 category:
 *                   type: string
 *                   description: The category of the deleted recipe.
 *                 instructions:
 *                   type: array
 *                   description: The instructions of the deleted recipe.
 *                   items:
 *                     type: string
 *                 description:
 *                   type: string
 *                   description: The description of the deleted recipe.
 *                 thumb:
 *                   type: string
 *                   description: The thumbnail image of the deleted recipe.
 *                 time:
 *                   type: string
 *                   description: The time it takes to prepare and cook the deleted recipe.
 *                 ingredients:
 *                   type: array
 *                   description: The ingredients of the deleted recipe.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The ID of the ingredient.
 *                       measure:
 *                         type: string
 *                         description: The amount of the ingredient used in the recipe.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: The specified recipe was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *
 */
router.delete('/:id', auth, removeOwnRecipes);

module.exports = router;
