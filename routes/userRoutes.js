import express from 'express';
import {
  authUser,
  registerUser,
  updateUser,
  getUsers,
  deleteUser,
  updatePassword,
} from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

/**
 * @author Emil Waldemar Strand
 */
const router = express.Router();

router.route('/')
  .get(protect, isAdmin, getUsers)
  .post(protect, isAdmin, registerUser)
router.route('/:id')
.delete(protect, isAdmin, deleteUser)
.patch(protect, isAdmin, updateUser);
router.post('/updatePassword', protect, updatePassword);
router.post('/login', authUser);




export default router;