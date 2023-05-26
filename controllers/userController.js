import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const getUsers = asyncHandler(async (req, res) => {
  const usersFound = await User.find({}).sort({ username: 1 }).select('-password');
  
  if(!usersFound){
    res.status(404);
    throw new Error('Users not found.');
  }

  res.status(200).json(usersFound);
});
/*
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById({ _id: req.params.id }).select('-password');
  if(!user){
    res.status(404);
    throw new Error("User not found.");
  }
  res.status(200).json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});
*/
// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, isAdmin } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ error: "Bruker finnes fra før." });
    throw new Error('User already exists');
  }
  
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    isAdmin,
  });
  

  if (!user) {
    res.status(400);
    throw new Error('Invalid user data');
  }

  generateToken(res, user._id);

  res.status(201).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isAdmin: user.isAdmin,
  });
  
});

// @desc    Delete goal
// @route   DELETE /api/version/users
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById({ _id: req.params.id }).select('-password');
  if (!user) {
    res.status(404);
    throw new Error({ Error: "User not found." });
  }

  const userDeleted = await user.remove();

  if (!userDeleted) {
    res.status(404);
    throw new Error({ Error: "User could not be deleted." });
  }

  res.status(200).json(userDeleted);
});




// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });


  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: res.token
    });
  } else {
    res.status(401);
    throw new Error('Feil e-post eller passord!');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUser = asyncHandler(async (req, res) => {

  const user = await User.findById({ _id: req.body.id });
  if(!user){
    res.status(404);
    throw new Error('User not found');
  }
    
  user.firstName = req.body.firstName || user.firstName;
  user.lastName = req.body.lastName || user.lastName;
  user.email = req.body.email || user.email;
  user.isAdmin = req.body.isAdmin || user.isAdmin;
    

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  res.status(200).json({
    id: updatedUser.id,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
});

export {
  deleteUser,
  authUser,
  registerUser,
  updateUser,
  getUsers
};