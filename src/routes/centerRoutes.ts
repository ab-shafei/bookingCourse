import { Router } from "express";
import {
  getAllCenters,
  getCenterById,
  createCenter,
  updateCenter,
  deleteCenter,
} from "../controllers/centerController";
import { authenticateJWT, authorizeRoles } from "../middlewares/authMiddleware";
import {
  createCenterValidation,
  updateCenterValidation,
} from "../validations/centerValidation";

const router = Router();

router.get("/", getAllCenters);
router.get("/:id", getCenterById);
router.post(
  "/",
  createCenterValidation,
  authenticateJWT,
  authorizeRoles("ADMIN"),
  createCenter
);
router.put(
  "/:id",
  updateCenterValidation,
  authenticateJWT,
  authorizeRoles("ADMIN"),
  updateCenter
);
router.delete("/:id", authenticateJWT, authorizeRoles("ADMIN"), deleteCenter);
export default router;
