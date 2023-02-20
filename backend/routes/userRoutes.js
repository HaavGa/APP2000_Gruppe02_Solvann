const express = require('express');
const router = express.Router();
const {
    getUsers, 
    getUserById, 
    getUserByUsername,
    setUser,
    updateUser, 
    deleteUser
} = require('../controllers/userController');

// /api/version/users
router.route('/').get(getUsers).post(setUser);
router.route('/id/:id').get(getUserById).patch(updateUser).delete(deleteUser);
router.route('/username/').get(getUserByUsername);

module.exports = router;