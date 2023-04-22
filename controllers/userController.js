import asyncHandler from "express-async-handler";
import { userModel as users } from "../models/userModel.js";
import mongoose from "mongoose";

// @desc    Get all users
// @route   GET /api/version/users
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
  console.log("Henter brukere");
  const usersFound = await users.find({}).sort({ username: 1 }); //
  return res.status(200).json(usersFound);
});

// @desc    Get single user
// @route   GET /api/version/users/:id
// @access  Private

const getUserById = async (req, res) => {
  console.log(`Henter bruker med id: ${req.params.id}`);
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ error: "No such user" });
  }
  const userFound = await users.findById(req.params.id).sort({
    createdAt: -1,
  });

  res.status(200).json(userFound);
};

const getUserByUsername = async (req, res) => {
  console.log("Getting user by username.");

  if (!req.body.username) {
    res.status(400);
    throw new Error("Please add a username field.");
  }

  const user = await users.findOne({ username: req.body.username });

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

// @desc    Set user
// @route   POST /api/version/users/
// @access  Private
const setUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const newUser = req.body;
  await users.create(newUser);
  res.status(200).json(newUser);
});

// @desc    signup user
// @route   POST /api/version/users/signup/
// @access  Private
const signupUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try{
    const user = await users.signup(email, password);
    res.status(200).json({ email, user })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
});

// @desc    Update user
// @route   PUT /api/version/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  console.log("Oppdaterer bruker");
  const userFound = await users.findById(req.params.id);
  if (!userFound) {
    res.status(400);
    throw new Error({ Error: "User not found." });
  }
  const updatedUser = await users.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json({ updatedUser });
});

// @desc    Delete goal
// @route   DELETE /api/version/users
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const userFound = await users.findById(req.params.id);
  if (!userFound) {
    res.status(400);
    throw new Error({ Error: "User not found." });
  }

  await userFound.remove();

  res.status(200).json({ id: req.params.id });
});

export {
  signupUser,
  getUsers,
  getUserById,
  getUserByUsername,
  setUser,
  updateUser,
  deleteUser,
};