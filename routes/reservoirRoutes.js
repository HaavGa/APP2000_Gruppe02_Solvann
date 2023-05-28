import express from "express";
const router = express.Router();
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import {
  log2Hour,
  log24Hour,
  updateGraphs,
  updateHome,
} from "../controllers/reservoirController.js";

router.get('/updateHome', updateHome);
router.get('/updateGraphs', updateGraphs);
router.get('/log2Hour', log2Hour);
router.get('/log24Hour', log24Hour)

export default router;
