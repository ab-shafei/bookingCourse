import prisma from "../utils/prismaClient";
import { AppError } from "../middlewares/AppError";
import {
  BookCourseType,
  CancelBoookingType,
} from "../validations/schemas/bookingSchema";

export const getUserBookedCourses = async (studentId: number) => {
  return prisma.booking.findMany({
    where: { studentId },
    include: { course: true },
  });
};

export const bookCourse = async (
  studentId: number,
  { courseId }: BookCourseType
) => {
  const existingCourse = await prisma.course.findUnique({
    where: { id: courseId },
  });
  if (!existingCourse) throw new AppError(404, "Course not found");

  return prisma.booking.create({
    data: { studentId, courseId },
  });
};

export const cancelBooking = async (
  studentId: number,
  { courseId }: CancelBoookingType
) => {
  const existingBooking = await prisma.booking.findUnique({
    where: {
      studentId_courseId: { studentId, courseId },
    },
  });

  if (!existingBooking) throw new AppError(404, "Booking not found");

  return prisma.booking.delete({
    where: {
      studentId_courseId: { studentId, courseId },
    },
  });
};
