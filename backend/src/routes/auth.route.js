import express from "express";

const router = express.Router();

router.post("/user/register", (req, res) => {
  res.send("User Registration");
});

router.post("/user/login", (req, res) => {
  res.send("User Login");
});

router.post("/user/logout", (req, res) => {
  res.send("User Logout");
});

export default router;
