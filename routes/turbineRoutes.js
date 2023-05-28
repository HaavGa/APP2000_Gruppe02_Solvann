import express from 'express';
import {
    setTurbine, 
    setAll,
    getAll,
} from '../controllers/turbineController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:turbineNr', setTurbine)
router.route('/')
    .post(protect, isAdmin, setAll)
    .get(protect, getAll);

export default router;