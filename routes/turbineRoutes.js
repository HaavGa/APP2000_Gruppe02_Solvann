import express from 'express';
import {
    setTurbine, 
    setAll,
} from '../controllers/turbineController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, setTurbine);
router.route('/all')
    .post(protect, setAll)

export default router;