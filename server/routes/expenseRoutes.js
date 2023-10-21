import express from "express";
const router = express.Router();
import {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenseReport,
} from "../controllers/expenseController.js";
import verify from "../middlewares/auth.js";

router.get("/", verify, getExpenses);
router.get("/report", verify, getExpenseReport);
router.get("/:id", verify, getExpense);
router.post("/", verify, createExpense);
router.put("/:id", verify, updateExpense);
router.delete("/:id", verify, deleteExpense);

export default router;
