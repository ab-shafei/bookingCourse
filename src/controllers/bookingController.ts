import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import {
  getUserBookedCourses,
  bookCourse,
  cancelBooking,
} from "../services/bookingService";

export const getUserBookedCoursesController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user!;

    const courses = await getUserBookedCourses(id);
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

export const bookCourseController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user!;
    const { courseId } = req.body;

    const booking = await bookCourse(id, { courseId });
    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

export const cancelBookingController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user!;
    const { courseId } = req.body;

    const booking = await cancelBooking(id, { courseId });
    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};
