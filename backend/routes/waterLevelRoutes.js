import express from "express";
const router = express.Router();
import {
  getWaterLevel,
  setWaterLevel,
  updateWaterLevel,
  deleteWaterLevel,
} from "../controllers/waterLevelController.js";

// /api/version/vannstand
router.route("/").get(getWaterLevel).post(setWaterLevel);
router.route("/:id").patch(updateWaterLevel).delete(deleteWaterLevel);

export default router;
//hello