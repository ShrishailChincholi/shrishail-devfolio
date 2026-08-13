// Load environment variables FIRST - before any other imports
require('dotenv').config();

// Now import other modules
const express = require("express");
const cors = require("cors");
const path = require("path"); // ✅ ADD THIS for serving frontend

const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");
const notFound = require("./middleware/notFoundMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

// Connect to MongoDB
connectDB();

const app = express();

// ===== MIDDLEWARE =====
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
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

// ===== API ROUTES =====
app.use("/api/contacts", contactRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is running",
    environment: process.env.NODE_ENV
  });
});

app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is running"
  });
});

// ===== SERVE FRONTEND (FOR PRODUCTION) =====
// Check if we're in production (Render)
if (process.env.NODE_ENV === 'production') {
  // Serve static files from frontend/dist
  const frontendPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(frontendPath));
  
  // All non-API routes go to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
} else {
  // Development - API only
  app.get("/", (req, res) => {
    res.status(200).json({
      success: true,
      message: "Portfolio API is running in development mode"
    });
  });
}

// ===== ERROR HANDLING =====
app.use(notFound);
app.use(errorHandler);

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API: http://localhost:${PORT}/api/health`);
  
  if (process.env.NODE_ENV === 'production') {
    console.log(`🌐 Frontend: http://localhost:${PORT}`);
  }
});