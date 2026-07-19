const session = require("express-session");
const passport = require("./config/passport");
const errorHandler = require("./middleware/errorHandler");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
connectDB();
// Import Routes
const reviewRoutes = require("./routes/reviewRoutes");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
// Middleware
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "wandernest-secret",
    resave: false,
    saveUninitialized: false,
  })
);


app.use(passport.initialize());
app.use(passport.session());

// Home Route
app.get("/", (req, res) => {
  res.send("🚀 WanderNest Backend is Running!");
});

// Review Routes
app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
// Port
const PORT = process.env.PORT || 5000;
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});