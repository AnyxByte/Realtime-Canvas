import express from "express";
import {
  handleUserLogin,
  handleUserRegister,
  handleGetAllUsers,
} from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", handleUserLogin);
router.post("/register", handleUserRegister);
router.get("/all", auth, handleGetAllUsers);

export default router;
