import { Request, Response, NextFunction } from "express";
import {
  registerUser,
  loginUser,
  changePassword,
  updateUser,
} from "../services/authService";
import { AppError } from "../middlewares/AppError";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhoneNumber,
} from "../utils/validate";

const validRoles = ["ADMIN", "TEACHER", "STUDENT"];

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    email,
    password,
    firstName,
    lastName,
    address,
    phoneNumber,
    dateOfBirth,
    gender,
    role,
  } = req.body;

  try {
    // if (
    //   !email ||
    //   !password ||
    //   !firstName ||
    //   !lastName ||
    //   !phoneNumber ||
    //   !role
    // ) {
    //   throw new AppError(400, "Missing required fields");
    // }

    // // Validate the email format
    // if (!validateEmail(email)) {
    //   throw new AppError(400, "Invalid email format");
    // }

    // // Validate the password strength
    // if (!validatePassword(password)) {
    //   throw new AppError(
    //     400,
    //     "Password must be at least 8 characters long and include at least one letter and one number"
    //   );
    // }

    // // Validate the name
    // if (!validateName(firstName)) {
    //   throw new AppError(400, "Name must be at least 2 characters long");
    // }
    // if (!validateName(lastName)) {
    //   throw new AppError(400, "Name must be at least 2 characters long");
    // }

    // // Validate the phone number format
    // if (!validatePhoneNumber(phoneNumber)) {
    //   throw new AppError(
    //     400,
    //     'Invalid phone number format. It should start with "+" and include 10-15 digits'
    //   );
    // }

    // if (!validRoles.includes(role)) {
    //   throw new AppError(400, "Invalid role");
    // }

    const user = await registerUser({
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      role,
      dateOfBirth,
      gender,
    });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const data = await loginUser(email, password);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const changeUserPassword = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user!;
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await changePassword(id, {
      oldPassword,
      newPassword,
    });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUserController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user!;

    const user = await updateUser(id, {
      ...req.body,
    });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
