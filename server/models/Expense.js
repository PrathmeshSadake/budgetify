import { INTEGER, STRING } from "sequelize";
import sequelize from "../utils/database.js";

const Expense = sequelize.define("expenses", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  expense: {
    type: STRING,
    allowNull: false,
  },
  description: {
    type: STRING,
    allowNull: false,
  },
  price: {
    type: INTEGER,
    allowNull: false,
  },
});

export default Expense;
