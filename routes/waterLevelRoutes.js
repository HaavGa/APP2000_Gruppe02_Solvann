import express from "express";
const router = express.Router();
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import {
  fetchWaterLevel,
  noe,
  reservoarStatus,
  log2Hour,
  log24Hour,
} from "../controllers/waterLevelController.js";

router.route('/last').get(fetchWaterLevel);
router.route('/noe').get(noe);
router.route('/').get(reservoarStatus);
router.route('/log2Hour')
  .get(log2Hour);
router.route('/log24Hour')
  .get(log24Hour);

export default router;
