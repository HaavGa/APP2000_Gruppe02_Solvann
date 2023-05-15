import express from "express";
const router = express.Router();

import {
  signupUser,
  getUsers,
  getUserById,
  getUserByUsername,
  loginUser,
  setUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

// /api/users

router.route("/")
  .get(getUsers)
  .post(signupUser);
  
router.route("/id/:id")
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

router.route("/username/")
  .get(getUserByUsername);

  // /api/users/login
  router.route("/login/")
    .post(loginUser);

export default router;