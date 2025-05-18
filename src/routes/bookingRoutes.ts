import { Router } from "express";

import {
  getUserBookedCoursesController,
  bookCourseController,
  cancelBookingController,
  getUserCoursesStatusController,
} from "../controllers/bookingController";

import { authenticateJWT, authorizeRoles } from "../middlewares/authMiddleware";
import {
  bookCourseValidation,
  cancelBookingValidation,
} from "../validations/bookingValidation";

const router = Router();

router.get(
  "/",
  // "/status",
  authenticateJWT,
  authorizeRoles("STUDENT", "ADMIN"),
  getUserCoursesStatusController
);

// router.get(

//   authenticateJWT,
//   authorizeRoles("STUDENT", "ADMIN"),
//   getUserBookedCoursesController
// );
router.post(
  "/",
  bookCourseValidation,
  authenticateJWT,
  authorizeRoles("STUDENT", "ADMIN"),
  bookCourseController
);
router.delete(
  "/",
  cancelBookingValidation,
  authenticateJWT,
  authorizeRoles("STUDENT", "ADMIN"),
  cancelBookingController
);

export default router;
