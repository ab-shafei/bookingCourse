import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../utils/prismaClient";
import { validatePassword } from "../utils/validate";
import { AppError } from "../middlewares/AppError";
import { Role } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const registerUser = async (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  role: Role;
  dateOfBirth?: string;
  gender?: string;
}) => {
  const { email, password, phoneNumber } = data;
  const existingUserByEmail = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUserByEmail) {
    throw new AppError(400, "Email is already registered");
  }

  //   // Check if the phone number is already registered
  const existingUserByPhone = await prisma.user.findFirst({
    where: { phoneNumber },
  });
  if (existingUserByPhone) {
    throw new AppError(400, "Phone number is already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new AppError(404, "User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new AppError(400, "Invalid credentials");

  const token = jwt.sign(
    {
      user: {
        id: user.id,
        role: user.role,
      },
    },
    JWT_SECRET,
    {
      expiresIn: "365d",
    }
  );
  return { token, user };
};

export const changePassword = async (
  id: number,
  {
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }
) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw new AppError(404, "User not found");
  }
  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) throw new AppError(400, "Wrong password");

  // Validate the password strength
  if (!validatePassword(newPassword)) {
    throw new AppError(
      400,
      "Password must be at least 8 characters long and include at least one letter and one number"
    );
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      password: hashedPassword,
    },
  });
};
