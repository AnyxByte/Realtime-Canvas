import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        msg: "missing fields",
      });
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        msg: "user doesnt exists",
      });
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(400).json({
        msg: "credentials incorrect",
      });
    }

    const payload = {
      username: user.username,
      email: user.email,
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      msg: "login successfull",
      token,
    });
  } catch (error) {
    console.log("handleUserLogin error:- ", error);
    return res.status(500).json({
      msg: "server error",
    });
  }
};

export const handleUserRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        msg: "missing fields",
      });
    }

    const user = await User.findOne({
      email,
    });

    if (user) {
      return res.status(400).json({
        msg: "account already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      username,
      password: hashedPassword,
    });

    return res.status(201).json({
      msg: "registered successfully",
    });
  } catch (error) {
    console.log("handleUserRegister error:- ", error);
    return res.status(500).json({
      msg: "server error",
    });
  }
};

export const handleGetAllUsers = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({
        msg: "unauthorized",
      });
    }

    const user = await User.find({}).select("username email");

    return res.status(200).json({
      msg: "all users",
      user,
    });
  } catch (error) {
    console.log("handleGetAllUsers error:- ", error);
    return res.status(500).json({
      msg: "server error",
    });
  }
};
