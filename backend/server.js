// Load environment variables FIRST - before any other imports
require('dotenv').config();

// Now import other modules
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");
const notFound = require("./middleware/notFoundMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

// ===== CONNECT TO MONGODB =====
connectDB();

const app = express();

// ===== MIDDLEWARE =====
// CORS - Allow frontend to connect
const allowedOrigins = [
  process.env.CLIENT_URL,
  'https://shrishail-devfolio.onrender.com',
  'http://localhost:5173',
  'http://localhost:3000'
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        console.log('❌ CORS blocked for origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Body parsers
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

// ===== LOGGING MIDDLEWARE (for debugging) =====
app.use((req, res, next) => {
  console.log(`📝 ${req.method} ${req.url}`);
  next();
});

// ===== API ROUTES =====
// Health check endpoint
app.get("/api/health", (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.status(200).json({
    success: true,
    message: "Portfolio API is running",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
    database: dbStatus
  });
});

// API info endpoint
app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is running",
    endpoints: {
      health: "/api/health",
      contacts: "/api/contacts"
    },
    environment: process.env.NODE_ENV || "development"
  });
});

// Contact form routes
app.use("/api/contacts", contactRoutes);

// Test route
app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Test route is working!",
    timestamp: new Date().toISOString()
  });
});

// ===== SERVE FRONTEND (PRODUCTION ONLY) =====
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/dist');
  
  console.log('📁 Frontend path:', frontendPath);
  
  if (fs.existsSync(frontendPath)) {
    console.log('✅ Frontend build found, serving static files');
    app.use(express.static(frontendPath));
    
    // ✅ FIXED: Use a function instead of '*' string
    app.get(/^\/(?!api).*/, (req, res) => {
      res.sendFile(path.join(frontendPath, 'index.html'));
    });
  } else {
    console.log('⚠️ Frontend build not found at:', frontendPath);
    console.log('📁 Current directory:', __dirname);
    console.log('📁 Files in current directory:', fs.readdirSync(__dirname));
    
    app.get("/", (req, res) => {
      res.status(200).json({
        success: true,
        message: "Portfolio API is running (frontend not built)",
        environment: process.env.NODE_ENV,
        note: "Build your frontend with: cd frontend && npm run build"
      });
    });
    
    app.get(/^\/(?!api).*/, (req, res) => {
      res.status(200).json({
        success: true,
        message: "Portfolio API is running",
        note: "Frontend not found. Please build the frontend.",
        endpoints: {
          health: "/api/health",
          contacts: "/api/contacts",
          test: "/api/test"
        }
      });
    });
  }
} else {
  // Development mode - API only
  app.get("/", (req, res) => {
    res.status(200).json({
      success: true,
      message: "Portfolio API is running in development mode",
      environment: "development",
      endpoints: {
        health: "/api/health",
        contacts: "/api/contacts",
        test: "/api/test"
      }
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
  console.log(`🔗 Health: http://localhost:${PORT}/api/health`);
  console.log(`📝 Test: http://localhost:${PORT}/api/test`);
  
  if (process.env.NODE_ENV === 'production') {
    console.log(`🌐 Frontend: http://localhost:${PORT}`);
  }
});

// ===== HANDLE UNCAUGHT ERRORS =====
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error.message);
  console.error(error.stack);
});

process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled Rejection:', error.message);
  console.error(error.stack);
});