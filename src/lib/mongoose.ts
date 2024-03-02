import mongoose from "mongoose";

export async function connectToDatabase() {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("MISSING MONGODB_URL");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "EldaFriend",
    });
  } catch (error) {
    console.log(error);
  }
}
