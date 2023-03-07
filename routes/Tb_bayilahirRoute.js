import express from "express";
import { verifyUser } from "../middleware/AuthUser.js";
import { getBayiLahir } from "../controllers/Tb_bayilahirController.js";

const router = express.Router();

router.get("/bayilahir", verifyUser, getBayiLahir);

export default router;
