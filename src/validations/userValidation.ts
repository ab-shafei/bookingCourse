import { Request, Response, NextFunction } from "express";
import { parse } from "valibot";
import { AppError } from "../middlewares/AppError";
import {
  CreateUserRequestSchema,
  UpdateUserRequestSchema,
} from "./schemas/userSchema";

export async function createUserValidation(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const validatedData = parse(CreateUserRequestSchema, { body: req.body });
    req.body = validatedData.body;
    next();
  } catch (error: any) {
    next(new AppError(400, `Validation Error: ${error.message}`));
  }
}

export async function updateUserValidation(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const validatedData = parse(UpdateUserRequestSchema, {
      params: req.params,
      body: req.body,
    });
    req.body = validatedData.body;
    next();
  } catch (error: any) {
    next(new AppError(400, `Validation Error: ${error.message}`));
  }
}
