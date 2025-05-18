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

  if (existingCourse.studentCount === existingCourse.maxStudentCount)
    throw new AppError(400, "Course max student reached");

  const alreadyBooked = await prisma.booking.findFirst({
    where: { studentId, courseId },
  });

  if (alreadyBooked) {
    throw new AppError(400, "Course already booked");
  }

  const [booking] = await prisma.$transaction([
    prisma.booking.create({ data: { studentId, courseId } }),
    prisma.course.update({
      where: { id: courseId },
      data: { studentCount: { increment: 1 } },
    }),
  ]);

  return booking;
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

export const getUserCoursesStatus = async (studentId: number) => {
  const [bookedCourses, favoriteCourses] = await Promise.all([
    prisma.booking.findMany({
      where: { studentId },
      include: { 
        course: {
          include: {
            Center: true,
            author: true
          }
        }
      }
    }),
    prisma.favorite.findMany({
      where: { studentId },
      include: { 
        course: {
          include: {
            Center: true,
            author: true
          }
        }
      }
    })
  ]);

  return {
    booked_courses: bookedCourses.map(booking => booking.course),
    favorite_courses: favoriteCourses.map(favorite => favorite.course)
  };
};
