import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import partnerModel from "../models/partner.model.js";

// PARTNER REGSTRATION
const registerPartner = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingPartner = await partnerModel.findOne({ email });

    if (existingPartner) return res.status(400).json({ message: "Partner already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPartner = new partnerModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: newPartner._id,
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);

    await newPartner.save();

    res.status(201).json({
      message: "Partner registered successfully",
      newPartner: {
        id: newPartner._id,
        email: newPartner.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// LOGIN PARTNER
const loginPartner = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingPartner = await partnerModel.findOne({ email });

    if (!existingPartner) return res.status(400).json({ message: "Partner does not exist" });

    const isPasswordCorrect = await bcrypt.compare(password, existingPartner.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        id: existingPartner._id,
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);

    res.status(200).json({
      message: "Partner logged in successfully",
      existingPartner: {
        id: existingPartner._id,
        email: existingPartner.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// LOGOUT PARTNER
const logoutPartner = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Partner logged out successfully" });
};

export { registerPartner, loginPartner, logoutPartner };
