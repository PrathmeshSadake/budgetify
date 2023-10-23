import Razorpay from "razorpay";
import User from "../models/User.js";

var razorpay = new Razorpay({
  key_id: "rzp_test_7Db7bFMnKZjUdl",
  key_secret: "sOQKWAzzQgDgWaeNgTTo6Cr0",
});

export const createOrder = async (req, res) => {
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
};

export const upgradeToPro = async (req, res) => {
  const { payment_id } = req.query;
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const payment = await razorpay.payments.fetch(payment_id);

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
};
