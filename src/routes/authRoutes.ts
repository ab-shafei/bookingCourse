import { Router } from "express";
import {
  register,
  login,
  changeUserPassword,
} from "../controllers/authController";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/change-password", authenticateJWT, changeUserPassword);

export default router;
