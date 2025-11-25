import { ApiResponse } from "../../core/utils/api-response.js";
import { asyncHandler } from "../../core/utils/async-handler.js";
import {
  createJobApplierProfile,
  updateJobApplierProfile,
  getJobApplierProfile
} from "./jobApplier.service.js";

// -----------------------------
// Create Profile
// -----------------------------
export const createProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  
  // Multer file
  const resumeFileName = req.file ? req.file.filename : null;

  // Optional skills handling
  const bodyData = { ...req.body };
  if (bodyData.skills && typeof bodyData.skills === "string") {
    bodyData.skills = bodyData.skills.split(",").map(s => s.trim());
  }

  const profile = await createJobApplierProfile(userId, bodyData, resumeFileName);

  return res
    .status(201)
    .json(new ApiResponse(201, profile, "Job applier profile created."));
});

// -----------------------------
// Update Profile
// -----------------------------
export const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const resumeFileName = req.file ? req.file.filename : null;

  const bodyData = { ...req.body };
  if (bodyData.skills && typeof bodyData.skills === "string") {
    bodyData.skills = bodyData.skills.split(",").map(s => s.trim());
  }

  const updated = await updateJobApplierProfile(userId, bodyData, resumeFileName);

  return res
    .status(200)
    .json(new ApiResponse(200, updated, "Profile updated successfully."));
});

// -----------------------------
// Get My Profile
// -----------------------------
export const getMyProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const profile = await getJobApplierProfile(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, profile, "Profile fetched successfully."));
});
