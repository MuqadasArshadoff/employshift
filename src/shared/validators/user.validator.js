import { z } from "zod";

const registerSchema = z.object({
    userName: z
        .string({ required_error: "User name is required" })
        .min(3, "User name must be at least 3 characters long")
        .trim(),

    userEmail: z
        .email("Invalid email")
        .transform((email) => email.toLowerCase().trim()),

    userPassword: z
        .string({ required_error: "Password is required" })
        .min(6, "Password must be at least 6 characters long"),

    userRole: z
        .enum(["job-applier", "company-owner", "admin"])
        .default("job-applier")
        .optional(),
});

const loginSchema = z.object({


    userEmail: z
        .email("Invalid email")
        .transform((email) => email.toLowerCase().trim()),

    userPassword: z
        .string({ required_error: "Password is required" })
        .min(6, "Password must be at least 6 characters long"),


});

export { registerSchema, loginSchema };
