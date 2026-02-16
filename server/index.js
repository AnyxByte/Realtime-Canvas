import express from "express";
import dotenv from "dotenv";
import connectDb from "./utils/db.js";
import userRouter from "./routes/user.route.js";

dotenv.config();

const app = express();

const PORT = 3000 || process.env.PORT;

await connectDb();

app.use(express.json());

app.get("/test", (req, res) => {
  return res.status(200).json({
    msg: "server is running",
  });
});

app.use("/api/auth", userRouter);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
