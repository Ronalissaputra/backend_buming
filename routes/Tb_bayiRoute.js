import express from "express";
import { verifyUser } from "../middleware/AuthUser.js";
import { getBayi, createBayi } from "../controllers/Tb_bayiController.js";

const router = express.Router();

router.get("/bayi", verifyUser, getBayi);
router.post("/bayi", verifyUser, createBayi);

export default router;
