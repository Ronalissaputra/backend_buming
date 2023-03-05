import express from "express";
import { verifyUser } from "../middleware/AuthUser.js";
import {
  getIbuHamil,
  getIbuHamilById,
  createIbuHamil,
  updateIbuHamil,
  deleteIbuHamil,
} from "../controllers/Tb_ibuHamilController.js";

const router = express.Router();

router.get("/user", verifyUser, getIbuHamil);
router.get("/user/:id", verifyUser, getIbuHamilById);
router.post("/user", verifyUser, createIbuHamil);
router.patch("/user/:id", verifyUser, updateIbuHamil);
router.delete("/user/:id", verifyUser, deleteIbuHamil);

export default router;
