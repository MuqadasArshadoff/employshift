import { Router } from "express";
import { validate } from "../../core/middleware/validate.js";
import { isLoggedIn } from "../../core/middleware/isLoggedin.js";
import { uploadResume } from "../../core/utils/uploads/resume.js";
import { jobApplierSchema } from "../../shared/validators/jobApplier.validator.js";
import { createProfile, updateProfile, getMyProfile } from "./jobApplier.controller.js";

const router = Router();

// Debug middleware (optional, for testing)
const logFormData = (req, res, next) => {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);
  next();
};

// Create Profile
router.post(
  "/create",
  isLoggedIn,
  uploadResume.single("resume"),
  logFormData,           // Debug only
  validate(jobApplierSchema),
  createProfile
);

// Update Profile
router.put(
  "/update",
  isLoggedIn,
  uploadResume.single("resume"),
  logFormData,
  validate(jobApplierSchema.partial()),
  updateProfile
);

// Get Profile
router.get("/me", isLoggedIn, getMyProfile);

export default router;
