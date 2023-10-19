import express from "express";
import {
  createUser,
  forgotPassword,
  loginUser,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
