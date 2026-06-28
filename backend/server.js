const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Import Routes
const reviewRoutes = require("./routes/reviewRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("🚀 WanderNest Backend is Running!");
});

// Review Routes
app.use("/api/reviews", reviewRoutes);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});