import express from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/user/register", registerUser);

router.post("/user/login", (req, res) => {
  res.send("User Login");
});

router.post("/user/logout", (req, res) => {
  res.send("User Logout");
});

export default router;
