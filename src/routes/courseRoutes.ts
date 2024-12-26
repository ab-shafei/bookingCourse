import { Router } from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController";
import { authenticateJWT, authorizeRoles } from "../middlewares/authMiddleware";
import {
  createCourseValidation,
  updateCourseValidation,
} from "../validations/courseValidation";

const router = Router();

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.post(
  "/",
  createCourseValidation,
  authenticateJWT,
  authorizeRoles("TEACHER", "ADMIN"),
  createCourse
);
router.put(
  "/:id",
  updateCourseValidation,
  authenticateJWT,
  authorizeRoles("TEACHER", "ADMIN"),
  updateCourse
);
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRoles("TEACHER", "ADMIN"),
  deleteCourse
);
export default router;
