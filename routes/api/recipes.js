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

/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: Recipes API
 */

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Get a list of recipes by category, title, ingredient, page and limit
 *     tags: [Recipes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: integer
 *         description: Recipe category id
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Recipe title or part of it
 *       - in: query
 *         name: ingredient
 *         schema:
 *           type: string
 *         description: Recipe ingredient or part of it
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for paginated results
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Maximum number of results per page
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   thumb:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/', auth, getRecipesByCategory);

/**
 * @swagger
 * /recipes/categories:
 *   get:
 *     summary: Get a list of recipe categories
 *     tags: [Recipes]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/categories', auth, categoryList);

/**
 * @swagger
 * /recipes/ingredients:
 *   get:
 *     summary: Get a list of ingredients
 *     tags: [Recipes]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of ingredients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Unique identifier for the ingredient
 *                   name:
 *                     type: string
 *                     description: Name of the ingredient
 *                   image:
 *                     type: string
 *                     description: URL of the image for the ingredient
 *     securitySchemes:
 *       BearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *
 */
router.get('/ingredients', auth, getIngredientsList);

/**
 * @swagger
 * /recipes/main-page:
 *   get:
 *     summary: Get the list of recipes for the main page
 *     description: Returns an array of recipe objects for the main page, including id, title, category, instructions, description, thumbnail, preparartion time, and ingredients with their corresponding measures.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Recipes
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of recipe objects
 *         schema:
 *           type: array
 *           items:
 *             properties:
 *               id:
 *                 type: string
 *                 example: "001"
 *               title:
 *                 type: string
 *                 example: "Pasta with tomato sauce"
 *               category:
 *                 type: string
 *                 example: "Italian"
 *               instructions:
 *                 type: string
 *                 example: "1. Boil water in a large pot. 2. Add pasta and cook for 10 minutes. 3. Drain pasta and set aside. 4. Heat olive oil in a pan over medium heat. 5. Add garlic and cook for 1 minute. 6. Add tomato sauce and cook for 5 minutes. 7. Add cooked pasta to the pan and toss well. 8. Serve hot."
 *               description:
 *                 type: string
 *                 example: "This classic Italian dish is quick and easy to make, perfect for a weeknight dinner."
 *               thumb:
 *                 type: string
 *                 example: "https://www.example.com/images/pasta.jpg"
 *               time:
 *                 type: number
 *                 example: 20
 *               ingredients:
 *                 type: array
 *                 items:
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "001"
 *                     measure:
 *                       type: string
 *                       example: "2 cups"
 */

router.get('/main-page', auth, mainPage);

/**
 * @swagger
 * /recipes/popular:
 *   get:
 *     summary: Returns a list of popular recipes.
 *     description: Use to get a list of the most popular recipes.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Recipes
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A list of popular recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the recipe
 *                   title:
 *                     type: string
 *                     description: The title of the recipe
 *                   category:
 *                     type: string
 *                     description: The category of the recipe
 *                   instructions:
 *                     type: string
 *                     description: The cooking instructions for the recipe
 *                   description:
 *                     type: string
 *                     description: A short description of the recipe
 *                   thumb:
 *                     type: string
 *                     description: A thumbnail image for the recipe
 *                   time:
 *                     type: string
 *                     description: The amount of time to prepare and cook the recipe
 *                   ingredients:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: The ID of the ingredient
 *                         measure:
 *                           type: string
 *                           description: The amount and unit of measure for the ingredient
 */
router.get('/popular', auth, getPopularRecipes);

/**
 * @swagger
 * /recipes/favorite:
 *   get:
 *     summary: Get a list of favorite recipes.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Recipes
 *     parameters:
 *         - name: page
 *           in: query
 *           description: Page number to retrieve.
 *           schema:
 *             type: integer
 *         - name: limit
 *           in: query
 *           description: Number of items to retrieve per page.
 *           schema:
 *             type: integer
 *     responses:
 *       '200':
 *         description: A list of favorite recipes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the recipe.
 *                   title:
 *                     type: string
 *                     description: The title of the recipe.
 *                   category:
 *                     type: string
 *                     description: The category of the recipe.
 *                   instructions:
 *                     type: string
 *                     description: The instructions for the recipe.
 *                   description:
 *                     type: string
 *                     description: The description of the recipe.
 *                   thumb:
 *                     type: string
 *                     description: The URL of the thumbnail image for the recipe.
 *                   time:
 *                     type: string
 *                     description: The time required to prepare and cook the recipe.
 *                   ingredients:
 *                     type: array
 *                     description: The list of ingredients and their measurements.
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: The ID of the ingredient.
 *                         measure:
 *                           type: string
 *                           description: The measurement for the ingredient.
 */
router.get('/favorite', auth, getFavoriteRecipes);

/**
 * @swagger
 *
 * /recipes/id/{id}:
 *   get:
 *     summary: Get details of a recipe by ID
 *     tags:
 *       - Recipes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the recipe
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID of the recipe
 *                 title:
 *                   type: string
 *                   description: Title of the recipe
 *                 category:
 *                   type: string
 *                   description: Category of the recipe
 *                 instructions:
 *                   type: string
 *                   description: Instructions of the recipe
 *                 description:
 *                   type: string
 *                   description: Description of the recipe
 *                 thumb:
 *                   type: string
 *                   description: Thumbnail of the recipe
 *                 time:
 *                   type: number
 *                   description: Time in minutes required to prepare the recipe
 *                 ingredients:
 *                   type: array
 *                   description: List of ingredients with information about their ID, image, and measure
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID of the ingredient
 *                       image:
 *                         type: string
 *                         description: Image of the ingredient
 *                       measure:
 *                         type: string
 *                         description: Measure of the ingredient
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

router.get('/id/:id', auth, getRecipeById);

/**
 * @swagger
 * /recipes/favorite:
 *   post:
 *     summary: Add recipe to favorites
 *     description: Add recipe to user's favorites list
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Recipes
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token to authenticate user
 *       - in: body
 *         name: recipe
 *         description: Recipe object to add to favorites
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: ID of the recipe to add to favorites
 *           required:
 *             - id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Recipe added to favorites successfully
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: ID of the added recipe
 *             title:
 *               type: string
 *               description: Title of the added recipe
 *             category:
 *               type: string
 *               description: Category of the added recipe
 *             instructions:
 *               type: string
 *               description: Instructions on how to prepare the added recipe
 *             description:
 *               type: string
 *               description: Description of the added recipe
 *             thumb:
 *               type: string
 *               description: URL to the thumbnail image of the added recipe
 *             time:
 *               type: string
 *               description: Time required to prepare the added recipe
 *             ingredients:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID of the ingredient
 *                   measure:
 *                     type: string
 *                     description: Measurement of the ingredient
 */
router.post('/favorite', auth, addFavoriteRecipes);

/**
 * @swagger
 * /recipes/favorite/{id}:
 *   delete:
 *     summary: Delete a favorite recipe
 *     description: Deletes the favorite recipe with the specified ID from the user's account.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the favorite recipe to delete
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Recipes
 *     responses:
 *       200:
 *         description: The deleted favorite recipe object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: The specified favorite recipe was not found or not a favorite of the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete('/favorite/:id', auth, removeFavoriteRecipes);

module.exports = router;
