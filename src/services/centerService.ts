import prisma from "../utils/prismaClient";
import { AppError } from "../middlewares/AppError";
import {
  CreateCenterType,
  UpdateCenterType,
} from "../validations/schemas/centerSchema";

export const getCenters = async () => {
  const centers = await prisma.center.findMany();

  return centers;
};

export const getCenter = async (id: number) => {
  const center = await prisma.center.findUnique({
    where: { id },
  });
  if (!center) {
    throw new AppError(404, "Center not found");
  }

  return center;
};

export const addCenter = async (data: CreateCenterType) => {
  const center = await prisma.center.create({
    data,
  });
  return center;
};

export const modifyCenter = async (id: number, data: UpdateCenterType) => {
  const existingCenter = await prisma.center.findUnique({
    where: { id },
  });
  if (!existingCenter) {
    throw new AppError(404, "Center not found");
  }
  const center = await prisma.center.update({
    where: {
      id,
    },
    data,
  });
  return center;
};

export const removeCenter = async (id: number) => {
  const existingCenter = await prisma.center.findUnique({
    where: { id },
  });
  if (!existingCenter) {
    throw new AppError(404, "Center not found");
  }
  const center = await prisma.center.delete({
    where: {
      id,
    },
  });
  return center;
};
