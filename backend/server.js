// Load environment variables FIRST - before any other imports
require('dotenv').config();

// Now import other modules
const express = require("express");
const cors = require("cors");
const path = require("path"); // ✅ For serving frontend

const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");
const notFound = require("./middleware/notFoundMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

// ===== CONNECT TO MONGODB =====
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
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString()
  });
});

app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is running",
    endpoints: {
      health: "/api/health",
      contacts: "/api/contacts"
    }
  });
});

// ===== SERVE FRONTEND =====
// Check if we're in production (Render)
if (process.env.NODE_ENV === 'production') {
  // Serve static files from frontend/dist
  const frontendPath = path.join(__dirname, '../frontend/dist');
  
  // Check if frontend exists
  const fs = require('fs');
  if (fs.existsSync(frontendPath)) {
    console.log('✅ Frontend build found, serving static files');
    app.use(express.static(frontendPath));
    
    // All non-API routes go to index.html
    app.get('*', (req, res) => {
      res.sendFile(path.join(frontendPath, 'index.html'));
    });
  } else {
    console.log('⚠️ Frontend build not found, API only mode');
    app.get("/", (req, res) => {
      res.status(200).json({
        success: true,
        message: "Portfolio API is running (frontend not built)",
        environment: process.env.NODE_ENV
      });
    });
  }
} else {
  // Development - API only
  app.get("/", (req, res) => {
    res.status(200).json({
      success: true,
      message: "Portfolio API is running in development mode",
      environment: "development"
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

// ===== HANDLE UNCAUGHT ERRORS =====
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error.message);
});

process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled Rejection:', error.message);
});