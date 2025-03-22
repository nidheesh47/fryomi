const express = require("express");
const cors = require("cors");
const { PORT, connectDB } = require("./config/db");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/auth");
const restaurantRoutes = require("./routes/restaurantRoutes");
const cartRoutes = require("./routes/cartRoutes");
const addressRoutes = require("./routes/addressRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const couponRoutes = require("./routes/couponRoutes");
const orderRoutes = require("./routes/orderRouter");

const authMiddleware = require("./middlewares/authMiddleware");
const roleMiddleware = require("./middlewares/roleMiddleware");

const dotenv = require("dotenv");
dotenv.config();
const app = express();

// Middleware to parse JSON bodies
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

// CORS configuration
app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL], // Allow requests from these origins
    credentials: true, // Allow cookies and credentials
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Allow these HTTP methods
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ], // Allow these headers
  })
);

// Handle preflight requests
app.options("*", cors());

// Verify environment variables
if (!process.env.CLIENT_URL || !process.env.ADMIN_URL) {
  console.warn(
    "CLIENT_URL or ADMIN_URL is not set in the environment variables."
  );
}

// Connect to the database
const db = connectDB;
db();

// Routes
app.use("/api/user", userRoutes);
app.use("/api/restaurant", restaurantRoutes);
app.use("/api/cart", authMiddleware, cartRoutes);
app.use("/api/address", authMiddleware, addressRoutes);
app.use("/api/review", authMiddleware, reviewRoutes);
app.use("/api/coupon", authMiddleware, couponRoutes);
app.use("/api/order", authMiddleware, orderRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API Running capstone Project");
});

// 404 handler
app.all("*", (req, res) => {
  res.status(404).json({ message: "Endpoint does not exist" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
