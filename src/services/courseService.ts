import prisma from "../utils/prismaClient";
import { AppError } from "../middlewares/AppError";
import {
  CreateCourseType,
  UpdateCourseType,
} from "../validations/schemas/courseSchema";

export const getCourses = async (search?: string) => {
  return prisma.course.findMany({
    where: {
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { author: { firstName: { contains: search, mode: "insensitive" } } },
          { Center: { name: { contains: search, mode: "insensitive" } } },
        ],
      }),
    },
    include: { author: true, Center: true },
  });
};

export const getCourse = async (id: number) => {
  const course = await prisma.course.findUnique({
    where: { id },
  });
  if (!course) {
    throw new AppError(404, "Course not found");
  }

  return course;
};

export const addCourse = async (authorId: number, data: CreateCourseType) => {
  const existingCenter = await prisma.center.findUnique({
    where: { id: data.centerId },
  });
  if (!existingCenter) {
    throw new AppError(404, "Center not found");
  }
  const course = await prisma.course.create({
    data: {
      ...data,
      authorId,
    },
  });
  return course;
};

export const modifyCourse = async (id: number, data: UpdateCourseType) => {
  const existingCourse = await prisma.course.findUnique({
    where: { id },
  });
  if (!existingCourse) {
    throw new AppError(404, "Course not found");
  }
  if (data.centerId) {
    const existingCenter = await prisma.center.findUnique({
      where: { id: data.centerId },
    });
    if (!existingCenter) {
      throw new AppError(404, "Center not found");
    }
  }

  const course = await prisma.course.update({
    where: {
      id,
    },
    data,
  });
  return course;
};

export const removeCourse = async (id: number) => {
  const existingCourse = await prisma.course.findUnique({
    where: { id },
  });
  if (!existingCourse) {
    throw new AppError(404, "Course not found");
  }
  const course = await prisma.course.delete({
    where: {
      id,
    },
  });
  return course;
};
