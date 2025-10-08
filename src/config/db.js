// config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

export const SuperAdmin = () => {
  return mongoose.connection.collection("super-admin");
};

export default connectDB;
