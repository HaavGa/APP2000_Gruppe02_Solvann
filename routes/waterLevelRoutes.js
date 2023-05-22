import express from "express";
const router = express.Router();
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import {
  getWaterLevel,
  setWaterLevel,
  updateWaterLevel,
  deleteWaterLevel,
  fetchWaterLevel,
} from "../controllers/waterLevelController.js";

router.route("/").get(getWaterLevel).post(setWaterLevel);
router.route("/last").get(fetchWaterLevel);
router.route("/:id", protect, isAdmin)
  .patch(updateWaterLevel)
  .delete(deleteWaterLevel);

export default router;
