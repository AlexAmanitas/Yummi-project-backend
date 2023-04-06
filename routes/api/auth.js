const express = require('express');

const router = express.Router();

const { auth, validateBody } = require('../../middlewares');

const { userRegisterSchema, userLoginSchema } = require('../../schemas/users');

const { register, logIn, logOut } = require('../../controllers/auth');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication API
 */

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with name, email, and password
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: the user's username
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 description: the user's email
 *                 example: johndoe@mail.com
 *               password:
 *                 type: string
 *                 description: the user's password
 *                 example: password123
 *     parameters:
 *       - in: body
 *         name: User
 *         description: User registration request
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: the user's username
 *               example: johndoe
 *             email:
 *               type: string
 *               description: the user's email
 *               example: johndoe@mail.com
 *             password:
 *               type: string
 *               description: the user's password
 *               example: password123
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message
 *                   example: User successfully registered
 */

router.post('/register', validateBody(userRegisterSchema), register);

/**
 * @openapi
 * /auth/signin:
 *   post:
 *     summary: Sign in with email and password
 *     description: Sign in an existing user with their email and password
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: the user's email
 *                 example: johndoe@mail.com
 *               password:
 *                 type: string
 *                 description: the user's password
 *                 example: password123
 *     parameters:
 *       - in: body
 *         name: User
 *         description: User registration request
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               description: the user's email
 *               example: johndoe@mail.com
 *             password:
 *               type: string
 *               description: the user's password
 *               example: password123
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message
 *                   example: User successfully login
 */
router.post('/signin', validateBody(userLoginSchema), logIn);

/**
 * @openapi
 * /auth/logout:
 *   get:
 *     summary: Logout user.
 *     description: Use this endpoint to log a user out of the application.
 *     tags: [Auth]
 *     securitySchemes:
 *       bearerAuth:
 *         type: apiKey
 *         name: Authorization
 *         in: header
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/logout', auth, logOut);

module.exports = router;
