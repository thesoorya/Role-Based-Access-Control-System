const express = require('express');
const { signup, login, logout, getUser } = require('../controllers/authController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', protect, isAdmin, signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, getUser);

module.exports = router;
