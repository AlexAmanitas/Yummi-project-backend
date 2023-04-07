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

router.get('/', auth, getCurrentUser);
router.patch(
  '/',
  auth,
  uploadAvatarCloud.single('avatar'),
  validateBody(userUpdateSchema),
  updateUser
);
router.get('/statistics', auth, getUserStatistics);
router.post('/subscribe', auth, subscribeUser);

module.exports = router;
