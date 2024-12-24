const { Op } = require('sequelize');
const User = require('../models/userModel');

// Controller for getting all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll(); // Fetch all users
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller for creating a new user
exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = await User.create({ name, email }); // Create a new user
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller for getting users by name
exports.getUserByName = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ error: "Query parameter 'name' is required" });
        }

        const users = await User.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%` // Search by name with partial match
                }
            }
        });

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
