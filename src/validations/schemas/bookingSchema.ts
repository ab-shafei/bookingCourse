import { object, number, InferInput } from "valibot";

export const BookCourseSchema = object({
  courseId: number("Invalid courseID"),
});

export const CancelBoookingSchema = object({
  courseId: number("Invalid courseID"),
});

export const BookCourseRequestSchema = object({
  body: BookCourseSchema,
});

export const CancelBoookingRequestSchema = object({
  body: CancelBoookingSchema,
});

export type BookCourseType = InferInput<typeof BookCourseSchema>;
export type CancelBoookingType = InferInput<typeof CancelBoookingSchema>;
