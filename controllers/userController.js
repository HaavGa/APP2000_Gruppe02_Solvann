import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import ChangelogRole from '../models/changelogRoleModel.js';
import generateToken from '../utils/generateToken.js';

/**
 * @author Brad Traversy, Emil Waldemar Strand
 * @source https://github.com/bradtraversy/mern-auth/blob/master/backend/controllers/userController.js
 *
 */

/**
 * @desc Henter alle brukere
 * @route GET /api/users/
 * @access Private
 */
const getUsers = asyncHandler(async (req, res) => {
  const usersFound = await User.find({}).sort({ username: 1 }).select('-password');
  
  if(!usersFound){
    res.status(404);
    throw new Error('Users not found.');
  }

  res.status(200).json(usersFound);
});

/**
 * @desc Registrerer ny bruker
 * @route POST /api/users/
 * @access Private
 */
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, isAdmin } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ error: "Bruker finnes fra før." });
    throw new Error('Bruker finnes fra før.');
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

  generateToken(res, user._id, user.isAdmin);

  res.status(201).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isAdmin: user.isAdmin,
  });
  
});

/**
 * @desc Sletter bruker
 * @route DELETE /api/users/:id
 * @access Private
 */
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

/**
 * @desc Autentiserer bruker
 * @route POST /api/users/login
 * @access Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });


  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id, user.isAdmin);
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

/**
 * @desc Oppdaterer kun passord på brukeren som har
 * legger inn nytt.
 * @route POST /api/users/updatePassword
 * @access Private
 */
const updatePassword = asyncHandler(async (req, res) => {
  
  req.user.password = req.body.password;

  const updatedUser = await req.user.save();

  if(!updatedUser){
    res.status(400).json({ Error: "Kunne ikke oppdatere passordet." });
    throw new Error({ error: "Kunne ikke oppdatere passordet." });
  }

  res.status(200).json({ msg: "Passord oppdatert" });
});

/**
 * @desc Oppdaterer bruker
 * @route PATCH /api/users/:id
 * @access Public
 */
const updateUser = asyncHandler(async (req, res) => {

  const user = await User.findById({ _id: req.params.id });
  if(!user){
    res.status(404);
    throw new Error('User not found');
  }
    
  user.firstName = req.body.firstName || user.firstName;
  user.lastName = req.body.lastName || user.lastName;
  user.email = req.body.email || user.email;
  
  if(req.body.isAdmin){
    user.isAdmin = req.body.isAdmin;
    const log = new ChangelogRole({
      adminId: req.user.id,
      userId: user.id,
      isAdmin: user.isAdmin,
    });

    const savedLog = await log.save();

    if(!savedLog){
      res.status(400).json({ Error: "Kunne ikke logge endring av rolle." });
      throw new Error({ error: "Kunne ikke logge endring av rolle." });
    }
  }

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
  getUsers,
  updatePassword,
};