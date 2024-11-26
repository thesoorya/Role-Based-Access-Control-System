const User = require('../models/userSchema');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

// @desc Register a new user (Signup)
// @route POST /api/users/signup
// @access Public
const signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const user = await User.create({
            name,
            email,
            password, // Ensure the password is hashed in the schema or here
            role,
        });

        // Respond with created user details (excluding password)
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Signup error:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc Authenticate user (Login)
// @route POST /api/users/login
// @access Public
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select('+password');

        if (user && (await user.matchPassword(password))) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc Logout user
// @route POST /api/users/logout
// @access Public
const logout = async (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0), // Set cookie expiration to immediately expire
    });
    res.status(200).json({ message: 'User logged out' });
};

// @desc Get user details
// @route GET /api/users/me
// @access Private
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { signup, login, logout, getUser };
