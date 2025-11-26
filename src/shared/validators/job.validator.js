// src/shared/validators/job.validator.js
import { z } from "zod";

export const jobSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    location: z.string().min(2),
    jobType: z.enum(["onsite","remote","hybrid"]),
    salaryType: z.enum(["monthly","weekly","hourly","daily"]),
    experience: z.number().min(0).optional(),
    skills: z.array(z.string()).optional()
});
