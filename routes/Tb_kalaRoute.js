import express from "express";
import { verifyUser } from "../middleware/AuthUser.js";
import { getKala } from "../controllers/Tb_kalaController.js";

const router = express.Router();

router.get("/kala", verifyUser, getKala);

export default router;
