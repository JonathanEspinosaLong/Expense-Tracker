const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

router.route("/").get(protect, getGoal).post(protect, setGoal);
router.route("/:id").delete(protect, deleteGoal).patch(protect, updateGoal);

module.exports = router;
