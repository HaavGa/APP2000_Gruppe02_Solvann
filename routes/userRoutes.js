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


router.post('/auth', authUser);
router.route('/new')
  .post(registerUser);
router.route('/:email')
  .get(getUserId);
router.route('/all')
  .get(getUsers);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .get(getUserProfile)             // hvordan skal jeg gjøre så kun brukeren det gjelder og admin har tilgang til denne??
  .put(updateUserProfile);

export default router;