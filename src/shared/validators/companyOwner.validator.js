// src/shared/validators/companyOwner.validator.js
import { z } from "zod";

export const companyOwnerSchema = z.object({
    userName: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    companyName: z.string().min(2),
    contactNumber: z.string().optional()
});
