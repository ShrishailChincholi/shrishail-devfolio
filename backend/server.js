// Load environment variables FIRST - before any other imports
require('dotenv').config();

// Now import other modules
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");
const notFound = require("./middleware/notFoundMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
  })
);

app.use(
  express.json({
    limit: "10kb"
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb"
  })
);

app.use("/api/contacts", contactRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is running",
    environment: process.env.NODE_ENV
  });
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is running"
  });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});