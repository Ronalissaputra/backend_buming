import express from "express";
import {
  verifyUser,
  superAdminOnly,
  adminOnly,
} from "../middleware/AuthUser.js";
import {
  getAdmin,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "../controllers/Admin.js";

const router = express.Router();

router.get("/admin", verifyUser, superAdminOnly, getAdmin);
router.get("/admin/:id", verifyUser, superAdminOnly, getAdminById);
router.post("/admin", createAdmin);
router.patch("/admin/:id", verifyUser, superAdminOnly, updateAdmin);
router.delete("/admin/:id", verifyUser, superAdminOnly, deleteAdmin);

export default router;
