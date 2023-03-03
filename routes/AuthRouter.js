import express from "express";
import {
  loginAdmin,
  logOutAdmin,
  meAdmin,
  loginIbuHamil,
  meIbuHamil,
  logoutIbuHamil,
} from "../controllers/Auth.js";
const router = express.Router();

router.get("/meadmin", meAdmin);
router.post("/loginadmin", loginAdmin);
router.delete("/logoutadmin", logOutAdmin);

// login user
router.get("/meuser", meIbuHamil);
router.post("/loginuser", loginIbuHamil);
router.delete("/logoutuser", logoutIbuHamil);

export default router;
