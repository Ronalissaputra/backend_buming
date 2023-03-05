import express from "express";
import { verifyUser } from "../middleware/AuthUser.js";
import { getKaladua } from "../controllers/Tb_kaladuaController.js";

const router = express.Router();

router.get("/kaladua", verifyUser, getKaladua);

export default router;
