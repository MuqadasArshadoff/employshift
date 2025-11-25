import JobApplier from "../../models/JobApplier.model.js";
import { ApiError } from "../../core/utils/api-error.js";

// ------------------------------
// Create Job Applier Profile
// ------------------------------
export const createJobApplierProfile = async (userId, data, resumePath) => {
  const exists = await JobApplier.findOne({ userId });
  if (exists) {
    throw new ApiError(400, "Profile already exists");
  }

  const profile = await JobApplier.create({
    userId,
    ...data,
    resume: resumePath || null,
  });

  return profile;
};

// ------------------------------
// Update Job Applier Profile
// ------------------------------
export const updateJobApplierProfile = async (userId, data, resumePath) => {
  const updateData = { ...data };

  if (resumePath) {
    updateData.resume = resumePath;
  }

  const updatedProfile = await JobApplier.findOneAndUpdate(
    { userId },
    updateData,
    { new: true }
  );

  if (!updatedProfile) {
    throw new ApiError(404, "Profile not found");
  }

  return updatedProfile;
};

// ------------------------------
// Get My Profile
// ------------------------------
export const getJobApplierProfile = async (userId) => {
  const profile = await JobApplier.findOne({ userId });

  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }

  return profile;
};
