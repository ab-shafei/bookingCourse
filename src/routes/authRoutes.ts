import { Router } from "express";
import {
  register,
  login,
  changeUserPassword,
  updateUserController,
} from "../controllers/authController";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { updateUserValidation } from "../validations/userValidation";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/change-password", authenticateJWT, changeUserPassword);
router.put(
  "/profile",
  updateUserValidation,
  authenticateJWT,
  updateUserController
);

export default router;
