import { Router } from "express";
import {
  getAllCoursesController,
  getCourseByIdController,
  createCourseController,
  updateCourseController,
  deleteCourseController,
} from "../controllers/courseController";
import { authenticateJWT, authorizeRoles } from "../middlewares/authMiddleware";
import {
  createCourseValidation,
  updateCourseValidation,
} from "../validations/courseValidation";

const router = Router();

router.get("/", getAllCoursesController);
router.get("/:id", getCourseByIdController);
router.post(
  "/",
  createCourseValidation,
  authenticateJWT,
  authorizeRoles("TEACHER", "ADMIN"),
  createCourseController
);
router.put(
  "/:id",
  updateCourseValidation,
  authenticateJWT,
  authorizeRoles("TEACHER", "ADMIN"),
  updateCourseController
);
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRoles("TEACHER", "ADMIN"),
  deleteCourseController
);

export default router;
