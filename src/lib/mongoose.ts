import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

export async function connectToDatabase() {
  mongoose.set("strictQuery", true);

  const { MONGODB_URL, DB_NAME } = process.env;

  if (!MONGODB_URL || !DB_NAME) {
    console.log("MISSING MONGODB_URL or DB_NAME");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URL, {
      dbName: DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}
