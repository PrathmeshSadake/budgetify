const express = require("express");
const router = express.Router();
const { protect } = require("../controllers/authController");
const {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");

router.get("/expenses", protect, getExpenses);
router.get("/expenses/:id", protect, getExpense);
router.post("/expenses", protect, createExpense);
router.put("/expenses/:id", protect, updateExpense);
router.delete("/expenses/:id", protect, deleteExpense);

module.exports = router;
