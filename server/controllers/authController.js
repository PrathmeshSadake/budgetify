import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const dotenv = require("dotenv");
dotenv.config();
import User from "../models/User.js";
import sendPasswordResetEmail from "../utils/sendPasswordResetEmail.js";
import generatePasswordResetToken from "../utils/generatePasswordResetToken.js";

export const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const token = jwt.sign(
          { email: user.email, id: user.id },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({ message: "Authentication successful", token });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCurrentUser = async (req, res) => {
  if (req.user) {
    const userWithoutPassword = { ...req.user };
    delete userWithoutPassword.password;
    res.json({ user: userWithoutPassword });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = await generatePasswordResetToken();
    console.log("Password Reset Token", token); // Implement this function to generate a secure random token
    await User.create({ token, userId: user.id, isActive: true });
    // await user.save();

    // await sendPasswordResetEmail(user.email, token); // Implement this function to send the reset password email

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const resetPassword = async (req, res) => {
  const { email, resetToken, newPassword } = req.body;
  try {
    const user = await User.findOne({
      where: { email, resetPasswordToken: resetToken },
    });
    if (!user) {
      return res.status(404).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
