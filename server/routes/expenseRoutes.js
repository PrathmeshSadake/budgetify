import express from "express";
const router = express.Router();
import {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.js";
import verify from "../middlewares/auth.js";

router.get("/", getExpenses);
router.get("/:id", getExpense);
router.post("/", verify, createExpense);
router.put("/:id", verify, updateExpense);
router.delete("/:id", verify, deleteExpense);

export default router;
