import express from "express";
import { verifyUser } from "../middleware/AuthUser.js";
import { getKunjunganbayi } from "../controllers/Tb_kunjunganbayiController.js";

const router = express.Router();

router.get("/kunjunganbayi", verifyUser, getKunjunganbayi);

export default router;
