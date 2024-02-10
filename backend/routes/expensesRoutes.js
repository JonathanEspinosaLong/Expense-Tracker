const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getExpenses,
  setExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");

router.route("/").get(protect, getExpenses).post(protect, setExpense);
router
  .route("/:id")
  .delete(protect, deleteExpense)
  .patch(protect, updateExpense);

module.exports = router;
