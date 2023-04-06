const express = require('express');

const router = express.Router();

const { auth, validateBody } = require('../../middlewares');

// const IngredientSchema = require('../../schemas/ingredients');

const {
  getShopingList,
  addShopingList,
  removeShopingList,
} = require('../../controllers/shopingList');

/**
 * @swagger
 * tags:
 *   name: Shopping List
 *   description: Shopping List API
 */

/**
 * @swagger
 * /shopping-list:
 *   get:
 *     summary: Retrieve a list of items for the user's shopping list
 *     tags: [Shopping List]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of items for the user's shopping list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The id of the shopping list item
 *                   name:
 *                     type: string
 *                     description: The name of the shopping list item
 *                   image:
 *                     type: string
 *                     description: The image URL of the shopping list item
 *                   quantity:
 *                     type: integer
 *                     description: The quantity of the shopping list item
 *                   unit:
 *                     type: string
 *                     description: The unit of the shopping list item
 */
router.get('/', auth, getShopingList);

/**
 * @swagger
 * /shopping-list:
 *   post:
 *     summary: Add to shopping list
 *     description: Add ingredients to the shopping list with the given id, quantity, and unit.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Shopping List
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Bearer + `token` (e.g. Bearer 123abc456def)
 *         type: string
 *       - in: body
 *         name: ingredients
 *         required: true
 *         description: Object with ingredient `id`, `quantity`, and `unit`
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             quantity:
 *               type: number
 *               example: 2
 *             unit:
 *               type: string
 *               example: cups
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             name:
 *               type: string
 *               example: flour
 *             image:
 *               type: string
 *               example: https://example.com/flour.png
 *             quantity:
 *               type: number
 *               example: 2
 *             unit:
 *               type: string
 *               example: cups
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/', auth, addShopingList);

/**
 * @swagger
 *
 * /api/DELETE/shopping-list/{id}:
 *   delete:
 *     summary: "Delete item from shopping list"
 *     description: "Delete an item from the shopping list by its id"
 *     operationId: "deleteShoppingListItem"
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - "Shopping List"
 *     parameters:
 *       - in: path
 *         name: id
 *         description: "ID of the shopping list item to delete"
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Successfully deleted the item from the shopping list"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: "ID of the deleted shopping list item"
 *                 name:
 *                   type: string
 *                   description: "Name of the deleted shopping list item"
 *                 image:
 *                   type: string
 *                   description: "Image of the deleted shopping list item"
 *                 quantity:
 *                   type: number
 *                   description: "Quantity of the deleted shopping list item"
 *                 unit:
 *                   type: string
 *                   description: "Unit of the deleted shopping list item"
 *       "400":
 *         description: "Invalid input parameters, or shopping list item not found"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "401":
 *         description: "Unauthorized access, missing or invalid authorization token"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "500":
 *         description: "Internal server error occurred while trying to delete shopping list item"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', auth, removeShopingList);

module.exports = router;
