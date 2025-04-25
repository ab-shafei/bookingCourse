import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import {
  addCourse,
  getCourse,
  getCourses,
  modifyCourse,
  removeCourse,
  getFavoriteCourses,
  addCourseToFavorite,
  removeCourseFromFavorite,
} from "../services/courseService";
import { AppError } from "../middlewares/AppError";

export const getAllCoursesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query as any;

    if (query.price) {
      const convertedId = Number(query.price);
      if (isNaN(convertedId)) {
        throw new AppError(400, "Price invalid");
      }
      query.price = parseFloat(query.price);
    }

    const courses = await getCourses(query);
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

export const getFavoriteCoursesController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user!;

    const courses = await getFavoriteCourses(id);
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

export const getCourseByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const convertedId = Number(id);
    if (isNaN(convertedId)) {
      throw new AppError(400, "course id invalid");
    }

    const course = await getCourse(convertedId);
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

export const createCourseController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user!;
    const { startDate } = req.body;
    if (isNaN(Date.parse(startDate))) {
      throw new AppError(400, "Invalid date for 'start'");
    }

    const course = await addCourse(id, {
      ...req.body,
      startDate: new Date(startDate),
    });

    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

export const updateCourseController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { startDate } = req.body;

    const convertedId = Number(id);
    if (isNaN(convertedId)) {
      throw new AppError(400, "course id invalid");
    }
    if (startDate && !isNaN(Date.parse(startDate))) {
      req.body.startDate = new Date(startDate);
    }

    const course = await modifyCourse(convertedId, {
      ...req.body,
    });
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

export const deleteCourseController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const convertedId = Number(id);
    if (isNaN(convertedId)) {
      throw new AppError(400, "course id invalid");
    }
    const course = await removeCourse(convertedId);
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

export const adddCourseToFavoriteController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user!;
    const { courseId } = req.params;
    const convertedId = Number(courseId);
    if (isNaN(convertedId)) {
      throw new AppError(400, "course id invalid");
    }
    const message = await addCourseToFavorite(id, convertedId);
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

export const removeCourseFromFavoriteController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user!;
    const { courseId } = req.params;
    const convertedId = Number(courseId);
    if (isNaN(convertedId)) {
      throw new AppError(400, "course id invalid");
    }
    const message = await removeCourseFromFavorite(id, convertedId);
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};
