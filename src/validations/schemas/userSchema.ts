import { Role } from "@prisma/client";
import {
  object,
  pipe,
  string,
  InferInput,
  email,
  minLength,
  maxLength,
  enum as venum,
  optional,
} from "valibot";

export const CreateUserSchema = object({
  name: string(),
  email: pipe(string("Email is required"), email()),
  password: pipe(
    string("Password is required"),
    minLength(8, "Your password is too short."),
    maxLength(30, "Your password is too long.")
    // regex(/[a-z]/, "Your password must contain a lowercase letter."),
    // regex(/[A-Z]/, "Your password must contain a uppercase letter."),
    // regex(/[0-9]/, "Your password must contain a number.")
  ),
  phoneNumber: string("Enter phone number"),
  role: optional(venum(Role, "Invalid Rule")),
});

export const UpdateUserSchema = object({
  firstName: optional(string("Invalid firstName")),
  lastName: optional(string("Invalid lastName")),
  phoneNumber: optional(string("Invalid phoneNumber")),
  address: optional(string("Invalid aaddress")),
  dateOfBirth: optional(string("Invalid dataOfBirth")),
});

export const CreateUserRequestSchema = object({
  body: CreateUserSchema,
});

export const UpdateUserRequestSchema = object({
  body: UpdateUserSchema,
});

export type CreateUserType = InferInput<typeof CreateUserSchema>;
export type UpdateUserType = InferInput<typeof UpdateUserSchema>;
