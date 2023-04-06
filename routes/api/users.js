const express = require('express');

const router = express.Router();

const { auth, validateBody, uploadAvatarCloud } = require('../../middlewares');

const { userUpdateSchema } = require('../../schemas/users');

const {
  getCurrentUser,
  updateUser,
  getUserStatistics,
  subscribeUser,
} = require('../../controllers/users');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User API
 */

/**
 * @swagger
 * components:
 *   responses:
 *     UnauthorizedError:
 *       description: Unauthorized access error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: Unauthorized access
 *     InternalServerError:
 *       description: Internal server error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: Internal server error
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get user details
 *     description: Returns user details including id, name, email, and avatar.
 *     tags: [User]
 *     securitySchemes:
 *       bearerAuth:
 *         type: apiKey
 *         name: Authorization
 *         in: header
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details were successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user's unique identifier.
 *                 name:
 *                   type: string
 *                   description: The user's name.
 *                 email:
 *                   type: string
 *                   description: The user's email address.
 *                 avatar:
 *                   type: string
 *                   description: The URL of the user's avatar image.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */

router.get('/', auth, getCurrentUser);

/**
 * @swagger
 * /user:
 *   patch:
 *     securitySchemes:
 *       bearerAuth:
 *         type: apiKey
 *         name: Authorization
 *         in: header
 *     security:
 *       - bearerAuth: []
 *     summary: Update user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               avatar:
 *                 type: string
 *             example:
 *               name: John Doe
 *               avatar: https://example.com/avatar.png
 *     responses:
 *       200:
 *         description: User was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 avatar:
 *                   type: string
 *             example:
 *               id: 1234567890
 *               name: John Doe
 *               email: john.doe@example.com
 *               avatar: https://example.com/avatar.png
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.patch(
  '/',
  auth,
  uploadAvatarCloud.single('avatar'),
  validateBody(userUpdateSchema),
  updateUser
);

/**
 * @swagger
 * /user/statistics:
 *   get:
 *     summary: Get user statistics
 *     description: Retrieve the number of days, recipes, favorites, and shopping lists for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User statistics successfully returned.
 *         schema:
 *           type: object
 *           properties:
 *             days:
 *               type: integer
 *               description: Number of days tracked by the user.
 *             recipes:
 *               type: integer
 *               description: Number of recipes saved by the user.
 *             favorites:
 *               type: integer
 *               description: Number of recipes marked as favorites by the user.
 *             shoppingLists:
 *               type: integer
 *               description: Number of shopping lists created by the user.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/statistics', auth, getUserStatistics);

/**
 * @swagger
 * /user/subscribe:
 *   post:
 *     summary: Subscribe to User.
 *     description: Subscribe email to User.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful subscription.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   description: Email of subscriber.
 *                   type: string
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 *     security:
 *       - bearerAuth: []
 */

router.post('/subscribe', auth, subscribeUser);

module.exports = router;
