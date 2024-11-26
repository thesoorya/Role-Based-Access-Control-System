const express = require("express");
const { protect, isAdmin, checkRole } = require("../middleware/authMiddleware");
const {
  getAllUsers,
  getSingleUser,
  editUser,
  deleteUser,
  getByRole,
} = require("../controllers/userController");

const router = express.Router();

router.get("/getusers", protect, checkRole(['admin', 'manager']), getAllUsers);
router.get("/getbyrole/:role", protect, isAdmin, getByRole);
router.get("/:id", protect, checkRole(['admin', 'manager']), getSingleUser);
router.put("/:id", protect, isAdmin, editUser);
router.delete("/:id", protect, isAdmin, deleteUser);

module.exports = router;
