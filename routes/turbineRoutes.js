import express from 'express';
import {
    setTurbine, 
    setAll,
    getAll,
} from '../controllers/turbineController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

/**
 * @author Emil Waldemar Strand
 */
const router = express.Router();

router.post('/:turbineNr', protect, setTurbine)
router.route('/')
    .post(protect, isAdmin, setAll)
    .get(protect, getAll);

export default router;