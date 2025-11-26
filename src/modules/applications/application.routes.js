import { Router } from "express";
import { isLoggedIn } from "../../core/middleware/isLoggedin.js";
import { applyJob, getApplications, updateApplication, getApplicationsForJob } from "./application.controller.js";

const router = Router();

router.post("/apply", isLoggedIn, applyJob);
router.get("/", isLoggedIn, getApplications);
router.put("/update/:id", isLoggedIn, updateApplication);

// ✅ Add this for job-specific applications
router.get("/job/:jobId", isLoggedIn, getApplicationsForJob);

export default router;
