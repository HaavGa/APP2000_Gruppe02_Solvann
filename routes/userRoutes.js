import express from "express";
const router = express.Router();

import {
  getUsers,
  getUserById,
  getUserByUsername,
  setUser,
  updateUser,
  deleteUser,
} from "./controllers/userController.js";

// /api/version/users

router.route("/")
  .get(getUsers)
  .post(setUser);
  
router.route("/id/:id")
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

router.route("/username/")
  .get(getUserByUsername);

export default router;