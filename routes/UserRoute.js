import express from "express";
import {
  verifyUser,
  adminOnly,
  superAdminOnly,
} from "../middleware/AuthUser.js";
import {
  getUserById,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/Users.js";

const router = express.Router();

router.get("/user", verifyUser, adminOnly, getUsers);
router.get("/user/:id", verifyUser, adminOnly, getUserById);
router.post("/user", verifyUser, adminOnly, createUser);
router.patch("/user/:id", verifyUser, adminOnly, updateUser);
router.delete("/user/:id", verifyUser, adminOnly, deleteUser);

export default router;
