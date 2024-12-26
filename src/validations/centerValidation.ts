import { Request, Response, NextFunction, query } from "express";
import { parse } from "valibot";
import { AppError } from "../middlewares/AppError";
import {
  CreateCenterRequestSchema,
  UpdateCenterRequestSchema,
} from "./schemas/centerSchema";

export async function createCenterValidation(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const validatedData = parse(CreateCenterRequestSchema, { body: req.body });
    req.body = validatedData.body;
    next();
  } catch (error: any) {
    next(new AppError(400, `Validation Error: ${error.message}`));
  }
}

export async function updateCenterValidation(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const validatedData = parse(UpdateCenterRequestSchema, {
      params: req.params,
      body: req.body,
    });
    req.body = validatedData.body;
    next();
  } catch (error: any) {
    next(new AppError(400, `Validation Error: ${error.message}`));
  }
}
