import prisma from "../utils/prismaClient";
import { AppError } from "../middlewares/AppError";
import {
  CreateCourseType,
  UpdateCourseType,
} from "../validations/schemas/courseSchema";
import { Level } from "@prisma/client";

export const getCourses = async (filter: {
  search?: string;
  field?: string;
  price?: number;
  address?: string;
  centerId?: number;
  level?: Level;
}) => {
  const { search, field, price, address, centerId, level } = filter;

  return await prisma.course.findMany({
    where: {
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { author: { firstName: { contains: search, mode: "insensitive" } } },
          { Center: { name: { contains: search, mode: "insensitive" } } },
        ],
      }),
      ...(field && { field }),
      ...(price && { price }),
      ...(address && {
        Center: { address: { contains: address, mode: "insensitive" } },
      }),
      ...(centerId && { centerId }),
      ...(level && { level }),
    },
    include: { author: true, Center: true },
  });
};

export const getFavoriteCourses = async (studentId: number) => {
  const favorites = await prisma.favorite.findMany({
    where: { studentId },
    include: { course: true },
  });

  return { courses: favorites.map((fav) => fav.course) };
};

export const getCourse = async (id: number) => {
  const course = await prisma.course.findUnique({
    where: { id },
    include: { author: true, Center: true },
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

export const addCourseToFavorite = async (
  studentId: number,
  courseId: number
) => {
  const existingCourse = await prisma.course.findUnique({
    where: { id: courseId },
  });
  if (!existingCourse) {
    throw new AppError(404, "Course not found");
  }

  const existingFavorite = await prisma.favorite.findUnique({
    where: { studentId_courseId: { studentId, courseId } },
  });
  if (existingFavorite) {
    throw new AppError(404, "Course already in favorite");
  }

  await prisma.favorite.create({
    data: { studentId, courseId },
  });
  return "Course added to favorite";
};

export const removeCourseFromFavorite = async (
  studentId: number,
  courseId: number
) => {
  const existingCourse = await prisma.course.findUnique({
    where: { id: courseId },
  });
  if (!existingCourse) {
    throw new AppError(404, "Course not found");
  }

  const existingFavorite = await prisma.favorite.findUnique({
    where: { studentId_courseId: { studentId, courseId } },
  });
  if (!existingFavorite) {
    throw new AppError(404, "Course not in favorite");
  }

  await prisma.favorite.delete({
    where: {
      studentId_courseId: { studentId, courseId },
    },
  });
  return "Course removed from favorite";
};
