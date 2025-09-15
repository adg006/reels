import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createFood } from "../controllers/food.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createFood);

export default router;
