import express from "express";
import { verifyUser, superAdminOnly } from "../middleware/AuthUser.js";
import {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/Tb_userController.js";

const router = express.Router();

router.get("/admin", verifyUser, superAdminOnly, getUser);
router.get("/admin/:id", verifyUser, superAdminOnly, getUserById);
router.post("/admin", createUser);
router.patch("/admin/:id", verifyUser, superAdminOnly, updateUser);
router.delete("/admin/:id", verifyUser, superAdminOnly, deleteUser);

export default router;
