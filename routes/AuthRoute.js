import express from "express";
import {
  Login,
  logOut,
  Me,
  LoginUser,
  logoutUser,
} from "../controllers/Auth.js";

const router = express.Router();

router.get("/me", Me);
router.post("/login", Login);
router.delete("/logout", logOut);

// Login User
router.post("/loginuser", LoginUser);
router.delete("/logoutuser", logoutUser);

export default router;
