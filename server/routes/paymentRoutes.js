import express from "express";
import Razorpay from "razorpay";
const router = express.Router();

var instance = new Razorpay({
  key_id: "rzp_test_7Db7bFMnKZjUdl",
  key_secret: "sOQKWAzzQgDgWaeNgTTo6Cr0",
});

router.post("/create-order", async (req, res) => {
  try {
    const order = await instance.orders.create({
      amount: 3000,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        key1: "value3",
        key2: "value2",
      },
    });
    console.log(order);
    return res.json(order);
  } catch (error) {
    console.log(error);
  }
});

export default router;
