// src/modules/jobs/job.routes.js
import { Router } from "express";
import { validate } from "../../core/middleware/validate.js";
import { jobSchema } from "../../shared/validators/job.validator.js";
import { isLoggedIn } from "../../core/middleware/isLoggedin.js";
import { createJob, updateJob, getOwnerJobs, filterJobs } from "./job.controller.js";


const router = Router();

router.post("/create", isLoggedIn, validate(jobSchema), createJob);
router.put("/update/:id", isLoggedIn, validate(jobSchema.partial()), updateJob);
router.get("/", isLoggedIn, getOwnerJobs);
router.post("/filter", isLoggedIn, filterJobs); // Filter/search by jobType, salaryType, experience, location, title

export default router;
