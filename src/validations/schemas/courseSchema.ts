import {
  object,
  pipe,
  string,
  optional,
  InferInput,
  uuid,
  number,
} from "valibot";

export const CreateCourseSchema = object({
  name: string("Invalid name"),
  description: string("Invalid description"),
  image: string("Invalid link"),
  field: string("Invalid field"),
  price: number(),
  startDate: string(),
  centerId: number(),
});

export const UpdateCourseSchema = object({
  name: optional(string("Invalid name")),
  description: optional(string("Invalid description")),
  image: optional(string("Invalid link")),
  field: optional(string("Invalid field")),
  price: optional(number()),
  startDate: optional(string()),
  centerId: optional(number()),
});

export const CreateCourseRequestSchema = object({
  body: CreateCourseSchema,
});

export const UpdateCourseRequestSchema = object({
  body: UpdateCourseSchema,
});

export const DeleteCourseRequestSchema = object({
  params: object({
    id: pipe(string(), uuid()),
  }),
});

export type CreateCourseType = InferInput<typeof CreateCourseSchema>;
export type UpdateCourseType = InferInput<typeof UpdateCourseSchema>;
