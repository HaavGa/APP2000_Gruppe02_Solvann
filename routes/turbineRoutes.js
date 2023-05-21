import express from 'express';
import {
    changeTurbineState, 
    turnOffAll,
} from '../controllers/turbineController.js';
import { protect, userIsAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(changeTurbineState);
router.route('/off')
    .post(turnOffAll)

export default router;