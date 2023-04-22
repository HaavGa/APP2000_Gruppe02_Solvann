import express from "express";
const router = express.Router();
import {
  getWaterLevel,
  setWaterLevel,
  updateWaterLevel,
  deleteWaterLevel,
  fetchWaterLevel
} from "../controllers/waterLevelController.js";

// /api/version/vannstand
router.route("/").get(getWaterLevel).post(setWaterLevel);
router.route("/fetchSolvann").get(fetchWaterLevel);
router.route("/:id").patch(updateWaterLevel).delete(deleteWaterLevel);

export default router;