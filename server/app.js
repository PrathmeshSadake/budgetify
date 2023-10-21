import express from "express";
import cors from "cors";
import sequelize from "./utils/database.js";
import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import User from "./models/User.js";
import Expense from "./models/Expense.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello👋");
});

User.hasMany(Expense);

app.use("/expenses", expenseRoutes);
app.use("/auth", authRoutes);
app.use("/razorpay", paymentRoutes);

const PORT = process.env.PORT || 8080;

sequelize
  .authenticate()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Database connection has been established successfully. Server listening on ${PORT}`
      );
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
