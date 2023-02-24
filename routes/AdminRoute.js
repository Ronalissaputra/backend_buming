import express from "express";
import {
  getAdmin,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "../controllers/Admin.js";
import { verifyUser, admin1Only, admin2Only } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/admin", verifyUser, admin1Only, getAdmin);
router.get("/admin/:id", verifyUser, admin1Only, getAdminById);
router.post("/admin", verifyUser, admin2Only, createAdmin);
router.patch("/admin/:id", verifyUser, admin1Only, updateAdmin);
router.delete("/admin/:id", verifyUser, admin1Only, deleteAdmin);

export default router;
