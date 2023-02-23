import express from "express";
const router = express.Router();
import {
  getVannstand,
  setVannstand,
  updateVannstand,
  deleteVannstand,
} from "../controllers/vannstandController.js";

// /api/version/vannstand
router.route("/").get(getVannstand).post(setVannstand);
router.route("/:id").patch(updateVannstand).delete(deleteVannstand);

export default router;
