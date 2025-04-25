import { Request, Response, NextFunction, query } from "express";
import { parse } from "valibot";
import { AppError } from "../middlewares/AppError";
import {
  BookCourseRequestSchema,
  CancelBoookingRequestSchema,
} from "./schemas/bookingSchema";

export async function bookCourseValidation(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const validatedData = parse(BookCourseRequestSchema, { body: req.body });
    req.body = validatedData.body;
    next();
  } catch (error: any) {
    next(new AppError(400, `Validation Error: ${error.message}`));
  }
}

export async function cancelBookingValidation(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const validatedData = parse(CancelBoookingRequestSchema, {
      body: req.body,
    });
    req.body = validatedData.body;
    next();
  } catch (error: any) {
    next(new AppError(400, `Validation Error: ${error.message}`));
  }
}
