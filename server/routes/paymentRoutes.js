import express from "express";
import verify from "../middlewares/auth.js";
import { createOrder, upgradeToPro } from "../controllers/paymentController.js";
const router = express.Router();

router.post("/orders", verify, createOrder);

router.put("/upgradeToPro", verify, upgradeToPro);

export default router;
