import prisma from "../utils/prismaClient";
import { AppError } from "../middlewares/AppError";
import {
  CreateCourseType,
  UpdateCourseType,
} from "../validations/schemas/courseSchema";

export const getCourses = async () => {
  const courses = await prisma.course.findMany();

  return courses;
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

export const searchCourses = async (query: string) => {
  return prisma.course.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { author: { firstName: { contains: query, mode: "insensitive" } } },
        { Center: { name: { contains: query, mode: "insensitive" } } },
      ],
    },
    include: { author: true, Center: true },
  });
};

export const filterCoursesByCenter = async (centerId: number) => {
  return prisma.course.findMany({
    where: { centerId },
  });
};
