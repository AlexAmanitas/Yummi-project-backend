const express = require('express');

const router = express.Router();

const { auth, validateBody, upload } = require('../../middlewares');

const { userUpdateSchema } = require('../../schemas/users');

const { getCurrentUser, updateUser } = require('../../controllers/auth');

router.get('/', auth, getCurrentUser);

router.patch('/', auth, validateBody(userUpdateSchema), updateUser);

module.exports = router;
