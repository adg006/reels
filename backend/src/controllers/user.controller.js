import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

// USER REGSTRATION
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      newUser: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (!existingUser) return res.status(400).json({ message: "User does not exist" });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// LOGOUT USER
const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
};

export { registerUser, loginUser, logoutUser };
