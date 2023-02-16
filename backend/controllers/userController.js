const asyncHandler = require("express-async-handler");
const users = require("../models/userModel");
const mongoose = require("mongoose");

// @desc    Get all users
// @route   GET /api/goals
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
    console.log("Fetching users");
    const usersFound = await users.find({}).sort({username: 1}); //
    res.status(200).json(usersFound);
})

// @desc    Get single user
// @route   GET /api/goals
// @access  Private

const getUserById = async (req, res) => {
    //const { id } = req.params;
    console.log(`Getting user ${req.params.id}`)
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(404).json({error: "No such user"});
    }
    const user = await users.findById(req.params.id).sort({createdAt: -1});

    if(!user) {
        // 404 because it can't be found. Traversy ville vel satt 400 - bad user request eller noe
        return res.status(404).json({error: "No such user"});
    }

    res.status(200).json(user);
}

const getUserByUsername = async (req, res) => {
    console.log("Getting user by username.");
    
    if(!req.body.username){
        res.status(400)
        throw new Error('Please add a username field.')
    }

    const user = await users.findOne({ username: req.body.username });

    if(!user) {
        // 404 because it can't be found. Traversy ville vel satt 400 - bad user request eller noe
        return res.status(404).json({error: "No such user"});
    }

    res.status(200).json(user);
}
// traversy media har gjort det slik som under. Han har
// her brukt urlencoded. Er det det vi trenger?
/*
const setUser = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field.')
    }

    const goal = await Goal.create({
        text: req.body.text
    })
    res.status(200).json(goal);
})
*/

// @desc    Set user
// @route   POST /api/version/users/
// @access  Private
const setUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    
    const newUser = req.body;

    if(await users.findOne( { username: newUser.username } )) {
        res.status(400);
        throw new Error("Username already exists");
    }

    await users.create(newUser);
    res.status(200).json(newUser);
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
    console.log("Oppdaterer bruker");
    const user = await users.findById(req.params.id)
    if(!user){
        res.status(400)
        throw new Error('User not found.')
    }
    const updatedUser = await users.findByIdAndUpdate(req.params.id,
        req.body, {
            new: true,
        })

    res.status(200).json({updatedUser});
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
    const user = await users.findById(req.params.id)
    if (!user){
        res.status(400)
        throw new Error('User not found.')
    }

    await user.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getUsers, 
    getUserById, 
    getUserByUsername,
    setUser,
    updateUser, 
    deleteUser
}