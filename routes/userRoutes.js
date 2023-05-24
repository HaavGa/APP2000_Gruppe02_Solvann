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

router.route('/').post(protect, isAdmin, getUserId);
router.route('/user').post(protect, isAdmin, getUser);
router.route('/:id').delete(protect, isAdmin, deleteUser)
router.post('/auth', authUser);
router.route('/new').post(protect, isAdmin, registerUser);
router.route('/all').get(protect, isAdmin, getUsers);
router.route('/profile').patch(protect, isAdmin, updateUser);

export default router;