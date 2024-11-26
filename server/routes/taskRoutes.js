const express = require('express');
const { protect, isAdmin, isManager } = require('../middleware/authMiddleware');
const {
    createTask,
    getSingleTask,
    getAllTasks,
    editTask,
    deleteTask,
    getUserTasks,
} = require('../controllers/taskController');

const router = express.Router();

router.post('/', protect, isManager, createTask);
router.get('/gettasks', protect, getAllTasks);
router.get('/getusertasks/:userId', protect, getUserTasks);
router.get('/:id', protect, getSingleTask);
router.put('/:id', protect, editTask);
router.delete('/:id', protect, isManager, deleteTask);

module.exports = router;
