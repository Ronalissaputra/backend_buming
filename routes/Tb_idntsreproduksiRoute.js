import express from "express";
import { verifyUser } from "../middleware/AuthUser.js";
import { getIdntsreproduksi } from "../controllers/Tb_idntsreproduksiController.js";

const router = express.Router();

router.get("/idntsreproduksi", verifyUser, getIdntsreproduksi);

export default router;
