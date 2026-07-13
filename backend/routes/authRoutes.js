const passport = require("passport");
const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const authLimiter = require("../middleware/rateLimiter");

// Public Routes (Rate Limited)
router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);

// Protected Route
router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "Protected Route Accessed",
    user: req.user,
  });
});
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

    res.json({
      message: "Google Login Successful",
      user: req.user
    });

  }
);
module.exports = router;