import express from "express";
import { verifyUser } from "../middleware/AuthUser.js";
import { getBayi } from "../controllers/Tb_bayiController.js";

const router = express.Router();

router.get("/bayi", verifyUser, getBayi);

export default router;
