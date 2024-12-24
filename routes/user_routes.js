const express = require('express');
const userController = require('../controller/user_controller');
const router = express.Router();

router.get('/getUsers', userController.getAllUsers); // Get all users
router.post('/getUsers', userController.createUser); // Create a user
router.get('/getUserByName', userController.getUserByName); // Get a user
module.exports = router;
