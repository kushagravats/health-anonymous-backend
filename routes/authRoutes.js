const express = require("express");
const router = express.Router();
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const anonymous_id = `user_${Math.random().toString(36).substring(2)}`;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      email,
      password,
      anonymous_id,
    });

    res.status(201).json({
      _id: user._id,
      anonymous_id: user.anonymous_id,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // @ts-ignore
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      anonymous_id: user.anonymous_id,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

module.exports = router;
