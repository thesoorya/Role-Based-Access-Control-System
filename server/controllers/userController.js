const User = require("../models/userSchema");
const Task = require("../models/taskSchema");

// @desc Get all users
// @route GET /api/users/getusers
// @access Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Get single user by ID
// @route GET /api/users/:id
// @access Admin
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Edit user details
// @route PUT /api/users/:id
// @access Admin
const editUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Delete user
// @route DELETE /api/users/:id
// @access Admin
const deleteUser = async (req, res) => {
  try {
      const { id } = req.params;

      const user = await User.findByIdAndDelete(id);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      await Task.deleteMany({
          $or: [{ assignedTo: id }, { assignedBy: id }],
      });

      res.status(200).json({ message: 'User and associated tasks deleted successfully' });
  } catch (error) {
      console.error('Error during user deletion:', error.message);
      res.status(500).json({ message: 'Failed to delete user' });
  }
};

const getByRole = async (req, res) => {
  try {
    const { role } = req.params;

    const users = await User.find({ role: role });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { getAllUsers, getSingleUser, editUser, deleteUser, getByRole };
