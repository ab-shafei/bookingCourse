import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import {
  addCenter,
  getCenter,
  getCenters,
  modifyCenter,
  removeCenter,
} from "../services/centerService";
import { AppError } from "../middlewares/AppError";

export const getAllCenters = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const centers = await getCenters();
    res.status(200).json(centers);
  } catch (error) {
    next(error);
  }
};

export const getCenterById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const convertedId = Number(id);
    if (isNaN(convertedId)) {
      throw new AppError(400, "center id invalid");
    }
    const center = await getCenter(convertedId);
    res.status(200).json(center);
  } catch (error) {
    next(error);
  }
};

export const createCenter = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const center = await addCenter(req.body);
    res.status(201).json(center);
  } catch (error) {
    next(error);
  }
};

export const updateCenter = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const convertedId = Number(id);
    if (isNaN(convertedId)) {
      throw new AppError(400, "center id invalid");
    }
    const center = await modifyCenter(convertedId, {
      ...req.body,
    });
    res.status(200).json(center);
  } catch (error) {
    next(error);
  }
};

export const deleteCenter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const convertedId = Number(id);
    if (isNaN(convertedId)) {
      throw new AppError(400, "center id invalid");
    }
    const center = await removeCenter(convertedId);
    res.status(200).json(center);
  } catch (error) {
    next(error);
  }
};
