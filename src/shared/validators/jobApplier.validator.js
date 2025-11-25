import { z } from "zod";

export const jobApplierSchema = z.object({
  fullName: z.string({
    required_error: "Full name is required",
    invalid_type_error: "Full name must be a string",
  }).min(3, "Full name must be at least 3 characters"),

  phone: z.string({
    required_error: "Phone is required",
    invalid_type_error: "Phone must be a string",
  }).min(10, "Phone must be at least 10 characters"),

  city: z.string({
    required_error: "City is required",
    invalid_type_error: "City must be a string",
  }).min(2, "City must be at least 2 characters"),

  experience: z.string().optional(),
  education: z.string().optional(),
  skills: z.string().optional(),
});
