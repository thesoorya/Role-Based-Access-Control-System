const Task = require('../models/taskSchema');

/**
 * @desc    Create a new task
 * @route   POST /api/tasks
 * @access  Private (Manager/Admin)
 */
const createTask = async (req, res) => {
    try {
        const { title, description, assignedTo } = req.body;

        if (!title || !description || !assignedTo) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const task = await Task.create({
            title,
            description,
            assignedTo,
            assignedBy: req.user._id,
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

/**
 * @desc    Get a single task by its ID
 * @route   GET /api/tasks/:id
 * @access  Private (Admin/Manager/Assigned Employee)
 */
const getSingleTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('assignedTo assignedBy', 'name email role');

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

/**
 * @desc    Get all tasks
 * @route   GET /api/tasks
 * @access  Private
 *          Admin/Manager: View all tasks
 *          Employee: View only tasks assigned to them
 */
const getAllTasks = async (req, res) => {
    try {
        let tasks;

        if (req.user.role === 'admin' || req.user.role === 'manager') {
            tasks = await Task.find().populate('assignedTo assignedBy', 'name email role');
        } else {
            tasks = await Task.find({ assignedTo: req.user._id }).populate('assignedTo assignedBy', 'name email role');
        }

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const getUserTasks = async (req, res) => {
    try {
        const { userId } = req.params;

        // Verify user role permissions
        if (req.user.role !== 'admin' && req.user.role !== 'manager' && req.user._id.toString() !== userId) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const tasks = await Task.find({ assignedTo: userId })
            .populate('assignedTo assignedBy', 'name email role');

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: 'No tasks found for this user' });
        }

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

/**
 * @desc    Edit an existing task
 * @route   PUT /api/tasks/:id
 * @access  Private (Admin/Manager)
 */
const editTask = async (req, res) => {
    try {
        const { title, description, status, assignedTo } = req.body;

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, status, assignedTo },
            { new: true, runValidators: true }
        ).populate('assignedTo assignedBy', 'name email role');

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

/**
 * @desc    Delete a task by its ID
 * @route   DELETE /api/tasks/:id
 * @access  Private (Admin/Manager)
 */
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createTask,
    getSingleTask,
    getAllTasks,
    editTask,
    deleteTask,
    getUserTasks
};
