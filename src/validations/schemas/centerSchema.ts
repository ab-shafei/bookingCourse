import {
  object,
  pipe,
  string,
  optional,
  InferInput,
  regex,
  email,
} from "valibot";

export const CreateCenterSchema = object({
  name: string("Invalid name"),
  address: string("Invalid address"),
  phoneNumber: pipe(
    string("Enter phone number"),
    regex(/^01\d{9}$/, "Phone number must be 11 numbers starting with 01")
  ),
  email: pipe(string(), email()),
  image: optional(string("Invalid link")),
});

export const UpdateCenterSchema = object({
  name: optional(string("Invalid name")),
  address: optional(string("Invalid address")),
  phoneNumber: optional(
    pipe(
      string("Enter phone number"),
      regex(/^01\d{9}$/, "Phone number must be 11 numbers starting with 01")
    )
  ),
  email: optional(pipe(string(), email())),
  image: optional(string("Invalid link")),
});

export const CreateCenterRequestSchema = object({
  body: CreateCenterSchema,
});

export const UpdateCenterRequestSchema = object({
  body: UpdateCenterSchema,
});

export type CreateCenterType = InferInput<typeof CreateCenterSchema>;
export type UpdateCenterType = InferInput<typeof UpdateCenterSchema>;
