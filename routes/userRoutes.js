import express from 'express';
import {
  authUser,
  registerUser,
  updateUser,
  getUsers,
  deleteUser,
} from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, isAdmin, getUsers)
  .post(protect, isAdmin, registerUser)
  .patch(protect, isAdmin, updateUser);
router.route('/:id').delete(protect, isAdmin, deleteUser)
router.post('/login', authUser);




export default router;