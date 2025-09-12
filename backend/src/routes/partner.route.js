import express from "express";
import { registerPartner, loginPartner, logoutPartner } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/partner/register", registerPartner);
router.post("/partner/login", loginPartner);
router.get("/partner/logout", logoutPartner);

export default router;
