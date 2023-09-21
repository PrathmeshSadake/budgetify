import { Router } from "express";
const router = Router();

import User, { findByCredentials, findById } from "../models/user";
import auth from "../middleware/auth";
import multer from "multer";
import sharp from "sharp";

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user: user, token: token });
  } catch (error) {
    // console.log(error);
    res.status(400).send(error);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user: user, token });
  } catch (error) {
    res.status(400).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  const updateKeys = Object.keys(req.body);
  const updatesAllowed = ["name", "email", "password", "age"];
  const areUpdatesValid = updateKeys.every((update) =>
    updatesAllowed.includes(update)
  );
  if (!areUpdatesValid) {
    return res.status(400).send({ error: "Invalid Update" });
  }
  try {
    updateKeys.forEach((update) => {
      req.user[update] = req.body[update];
    });
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
