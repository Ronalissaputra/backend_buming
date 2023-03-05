import express from "express";
import { verifyUser } from "../middleware/AuthUser.js";
import { getKalatiga } from "../controllers/Tb_kalatigaController.js";

const router = express.Router();

router.get("/kalatiga", verifyUser, getKalatiga);

export default router;
