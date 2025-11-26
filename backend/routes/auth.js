const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const logger = require("../utils/logger");

// Demo credential (for assignment/demo). In real app, use DB and hashed passwords.
const DEMO_USER = {
  username: "student",
  password: "password123",
  id: "user123",
};

router.post("/login", (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password)
    return res.status(400).json({ error: "username and password required" });

  if (username === DEMO_USER.username && password === DEMO_USER.password) {
    const token = jwt.sign(
      { sub: DEMO_USER.id, username },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
      }
    );
    logger.info(`User ${username} logged in`);
    return res.json({ token });
  } else {
    logger.info(`Failed login attempt for ${username}`);
    return res.status(401).json({ error: "Invalid credentials" });
  }
});

module.exports = router;
