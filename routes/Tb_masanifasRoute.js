import express from "express";
import { verifyUser } from "../middleware/AuthUser.js";
import { getMasanifas } from "../controllers/Tb_masanifas.js";

const router = express.Router();

router.get("/masanifas", verifyUser, getMasanifas);

export default router;
