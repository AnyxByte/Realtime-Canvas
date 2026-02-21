import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./utils/db.js";
import userRouter from "./routes/user.route.js";
import docRouter from "./routes/doc.route.js";
import { auth } from "./middlewares/auth.js";

dotenv.config();

const app = express();

const PORT = 3000 || process.env.PORT;

await connectDb();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.get("/test", (req, res) => {
  return res.status(200).json({
    msg: "server is running",
  });
});

app.use("/api/auth", userRouter);
app.use("/api/docs", auth, docRouter);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
