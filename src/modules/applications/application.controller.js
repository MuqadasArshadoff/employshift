// src/modules/applications/application.controller.js
import { asyncHandler } from "../../core/utils/async-handler.js";
import { ApiResponse } from "../../core/utils/api-response.js";
import {
  applyJobService,
  getApplicationsService,
  updateApplicationService,
  getApplicationsByJob,
} from "./application.service.js";

export const applyJob = asyncHandler(async (req, res) => {
  const jobApplierId = req.user._id;
  const application = await applyJobService(jobApplierId, req.body);
  res.status(201).json(new ApiResponse(201, application, "Applied successfully"));
});

export const getApplications = asyncHandler(async (req, res) => {
  const applications = await getApplicationsService();
  res.status(200).json(new ApiResponse(200, applications, "Applications fetched"));
});

export const updateApplication = asyncHandler(async (req, res) => {
  const { appId } = req.params;
  const application = await updateApplicationService(appId, req.body);
  res.status(200).json(new ApiResponse(200, application, "Application updated"));
});

export const getApplicationsForJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const applications = await getApplicationsByJob(jobId);
  res.status(200).json(new ApiResponse(200, applications, "Applications fetched for job"));
});
