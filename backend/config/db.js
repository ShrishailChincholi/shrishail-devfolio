// config/db.js - Updated Version
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log('🔍 Connecting to MongoDB...');
    
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    // ✅ Remove useNewUrlParser and useUnifiedTopology
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
    console.log(`📁 Database: ${connection.connection.name}`);
    
    return connection;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;