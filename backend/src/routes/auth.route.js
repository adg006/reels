import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller.js";
import { registerPartner, loginPartner, logoutPartner } from "../controllers/partner.controller.js";

const router = express.Router();

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/logout", logoutUser);

router.post("/partner/register", registerPartner);
router.post("/partner/login", loginPartner);
router.get("/partner/logout", logoutPartner);

export default router;
