import { Sequelize } from "sequelize";
import Expense from "../models/Expense.js";

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findByPk(id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getExpenseReport = async (req, res) => {
  console.log("Getting expense report");
  try {
    const expenses = await Expense.findAll();
    const groupedByMonth = {};
    expenses.forEach((expense) => {
      const date = new Date(expense.createdAt);
      const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;
      if (!groupedByMonth[monthYear]) {
        groupedByMonth[monthYear] = [];
      }
      groupedByMonth[monthYear].push(expense);
    });

    // Sort the expenses by createdAt within each month
    for (const month in groupedByMonth) {
      groupedByMonth[month].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }

    // Convert the object to an array for easier rendering
    const sortedExpenses = Object.keys(groupedByMonth)
      .sort()
      .map((key) => ({
        month: key,
        expenses: groupedByMonth[key],
      }));

    return res.json(sortedExpenses);
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

export const createExpense = async (req, res) => {
  const { expense, description, price } = req.body;
  const user = req.user;

  console.log(user.id);
  console.log(typeof user.id);

  try {
    const newExpense = await Expense.create({
      expense,
      description,
      price,
      userId: user.id,
    });
    res.status(201).json(newExpense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { expense, description, price } = req.body;
  try {
    const expenseToUpdate = await Expense.findByPk(id);
    if (!expenseToUpdate) {
      return res.status(404).json({ message: "Expense not found" });
    }
    expenseToUpdate.expense = expense;
    expenseToUpdate.description = description;
    expenseToUpdate.price = price;
    await expenseToUpdate.save();
    res.json(expenseToUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Expense.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
