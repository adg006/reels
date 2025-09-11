import mongoose from "mongoose";
import dotenv from "dotenv/config";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log("MongoDB connected");
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDB;
