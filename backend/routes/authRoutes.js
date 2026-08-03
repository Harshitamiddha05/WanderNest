const jwt = require("jsonwebtoken"); 
const passport = require("passport");
const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

console.log(authController);

const { register, login, getProfile } = authController;
const protect = require("../middleware/authMiddleware");
const authLimiter = require("../middleware/rateLimiter");
console.log("register:", typeof register);
console.log("login:", typeof login);
console.log("getProfile:", typeof getProfile);
console.log("protect:", typeof protect);
console.log("authLimiter:", typeof authLimiter);
console.log("AUTH ROUTES LOADED");
// Public Routes (Rate Limited)
router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);

// Protected Route
router.get("/profile", protect, getProfile);
// Google OAuth Login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google OAuth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const frontendURL =
    process.env.FRONTEND_URL || "http://localhost:3000";

    res.redirect(
      `${frontendURL}/auth/success?token=${token}`
  );
  }
);
module.exports = router;