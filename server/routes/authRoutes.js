import express from "express";
import {
  createUser,
  forgotPassword,
  loginUser,
  resetPassword,
  getCurrentUser,
} from "../controllers/authController.js";
import verify from "../middlewares/auth.js";

const router = express.Router();
router.get("/current-user", verify, getCurrentUser);

router.post("/signup", createUser);
router.post("/login", loginUser);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
