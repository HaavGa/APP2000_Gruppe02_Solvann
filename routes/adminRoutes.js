import express from 'express';
import {
    makeAdmin
} from '../controllers/adminController.js';
import { protect, userIsAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(makeAdmin);
    
export default router;