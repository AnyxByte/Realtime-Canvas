import mongoose from "mongoose";

export default async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "CanvasFlow",
    });
    console.log("connected to db successfully");
  } catch (error) {
    console.log("error connecting to db: ", error);
    process.exit(1);
  }
}
