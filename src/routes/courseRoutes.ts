import { Router } from "express";
import {
  getAllCoursesController,
  getCourseByIdController,
  createCourseController,
  updateCourseController,
  deleteCourseController,
  getFavoriteCoursesController,
  adddCourseToFavoriteController,
  removeCourseFromFavoriteController,
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

// favorite
router.get(
  "/me/favorites",
  authenticateJWT,
  authorizeRoles("STUDENT"),
  getFavoriteCoursesController
);
router.post(
  "/me/favorites/:courseId",
  authenticateJWT,
  authorizeRoles("STUDENT"),
  adddCourseToFavoriteController
);
router.delete(
  "/me/favorites/:courseId",
  authenticateJWT,
  authorizeRoles("STUDENT"),
  removeCourseFromFavoriteController
);

export default router;
