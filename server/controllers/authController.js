const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import User from "../models/User";

export const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
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
        const token = jwt.sign({ email: user.email, id: user.id }, "secret", {
          expiresIn: "1h",
        });
        res.status(200).json({ message: "Authentication successful", token });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
