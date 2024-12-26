import { Request, Response, NextFunction, query } from "express";
import { parse } from "valibot";
import { AppError } from "../middlewares/AppError";
import {
  CreateCourseRequestSchema,
  UpdateCourseRequestSchema,
} from "./schemas/courseSchema";

export async function createCourseValidation(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const validatedData = parse(CreateCourseRequestSchema, { body: req.body });
    req.body = validatedData.body;
    next();
  } catch (error: any) {
    next(new AppError(400, `Validation Error: ${error.message}`));
  }
}

export async function updateCourseValidation(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const validatedData = parse(UpdateCourseRequestSchema, {
      params: req.params,
      body: req.body,
    });
    req.body = validatedData.body;
    next();
  } catch (error: any) {
    next(new AppError(400, `Validation Error: ${error.message}`));
  }
}
