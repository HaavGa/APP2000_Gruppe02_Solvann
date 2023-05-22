import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserId
} from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/new')
  .post(protect, isAdmin, registerUser);
router.route('/:email')
  .get(protect, isAdmin, getUserId);
router.route('/all')
  .get(protect, isAdmin, getUsers);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .get(protect, getUserProfile)             // hvordan skal jeg gjøre så kun brukeren det gjelder og admin har tilgang til denne??
  .put(protect, isAdmin, updateUserProfile);

export default router;