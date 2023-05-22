import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers
} from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, isAdmin, registerUser)
  .get(protect, isAdmin, getUsers);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .get(protect, getUserProfile)             // hvordan skal jeg gjøre så kun brukeren det gjelder og admin har tilgang til denne??
  .put(protect, isAdmin, updateUserProfile);

export default router;