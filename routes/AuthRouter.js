import express from "express";
import {
  loginAdmin,
  logOutAdmin,
  meAdmin,
  loginUser,
  meUser,
  logoutUser,
} from "../controllers/Auth.js";
const router = express.Router();

router.get("/meadmin", meAdmin);
router.post("/loginadmin", loginAdmin);
router.delete("/logoutadmin", logOutAdmin);

// login user
// router.get("/meuser", meUser);
// router.post("/loginuser", loginUser);
// router.delete("/logoutuser", logoutUser);

export default router;
