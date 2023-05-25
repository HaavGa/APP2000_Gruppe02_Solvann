import express from "express";
const router = express.Router();
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import {
  fetchWaterLevel,
  noe,
  reservoarStatus,
} from "../controllers/waterLevelController.js";

router.route('/last').get(fetchWaterLevel);
router.route('/noe').get(noe);
router.route('/').get(reservoarStatus)

export default router;
