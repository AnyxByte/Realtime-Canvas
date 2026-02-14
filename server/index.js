import express from "express";
import dotenv from "dotenv";
import connectDb from "./utils/db.js";

dotenv.config();

const app = express();

const PORT = 3000 || process.env.PORT;

await connectDb();

app.get("/test", (req, res) => {
  return res.status(200).json({
    msg: "server is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
