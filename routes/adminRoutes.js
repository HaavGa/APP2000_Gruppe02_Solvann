import express from 'express';
import {
    getAdmin,
    makeAdmin,
    makeNotAdmin,
} from '../controllers/adminController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/:id')
    .get(getAdmin);
router.route('/new')
    .post(protect, isAdmin, makeAdmin);
router.route('/remove')
    .post(protect, isAdmin, makeNotAdmin);
    
export default router;