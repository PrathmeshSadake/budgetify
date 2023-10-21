import express from "express";
import Razorpay from "razorpay";
import User from "../models/User.js";
import verify from "../middlewares/auth.js";
const router = express.Router();

var razorpay = new Razorpay({
  key_id: "rzp_test_7Db7bFMnKZjUdl",
  key_secret: "sOQKWAzzQgDgWaeNgTTo6Cr0",
});

router.post("/orders", async (req, res) => {
  const options = {
    amount: req.body.amount,
    currency: "INR",
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/:paymentId/upgradeToPro/:userId", async (req, res) => {
  const { paymentId, userId } = req.params;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const payment = await razorpay.payments.fetch(paymentId);
    console.log("PAYMENT ID", paymentId);
    console.log("PAYMENT", payment);
    console.log("USER", user);

    if (payment) {
      // Payment found, handle further logic
      user.isPro = true; // Setting the isPro field to true
      await user.save(); // Saving the updated user instance

      return res.status(200).json({ message: "User updated to Pro" });
    } else {
      // Payment not found
      return res.status(404).json({ message: "Payment not found" });
    }
  } catch (error) {
    console.error("Error updating user to Pro:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
