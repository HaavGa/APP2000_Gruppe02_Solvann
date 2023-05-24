import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUser,
  getUsers,
  deleteUser,
  getUser,
  getUserId,
} from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(getUserId);
router.route('/user').post(getUser);
router.route('/delete').delete(deleteUser)
router.post('/auth', authUser);
router.route('/new').post(registerUser);
router.route('/all').get(getUsers);
router.post('/logout', logoutUser);
router.route('/profile').get(getUserProfile).patch(updateUser);

export default router;