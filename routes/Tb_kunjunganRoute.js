import express from "express";
import { verifyUser } from "../middleware/AuthUser.js";
import { getKunjungan } from "../controllers/Tb_kunjunganController.js";

const router = express.Router();

router.get("/kunjungan", verifyUser, getKunjungan);

export default router;
