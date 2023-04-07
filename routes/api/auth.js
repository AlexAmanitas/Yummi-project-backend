const express = require('express');

const router = express.Router();

const { auth, validateBody } = require('../../middlewares');

const { userRegisterSchema, userLoginSchema } = require('../../schemas/users');

const { register, logIn, logOut } = require('../../controllers/auth');

router.post('/register', validateBody(userRegisterSchema), register);
router.post('/signin', validateBody(userLoginSchema), logIn);
router.get('/logout', auth, logOut);

module.exports = router;
