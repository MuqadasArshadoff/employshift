// src/modules/jobs/job.controller.js
import { asyncHandler } from "../../core/utils/async-handler.js";
import { ApiResponse } from "../../core/utils/api-response.js";
import {
  createJobService,
  updateJobService,
  getJobsByOwner,
  filterJobsService,
  getJobById,
} from "./job.service.js";

export const createJob = asyncHandler(async (req, res) => {
  const ownerId = req.user._id;
  const job = await createJobService(ownerId, req.body);
  res.status(201).json(new ApiResponse(201, job, "Job created successfully"));
});

export const updateJob = asyncHandler(async (req, res) => {
  const ownerId = req.user._id;
  const { jobId } = req.params;
  const job = await updateJobService(ownerId, jobId, req.body);
  res.status(200).json(new ApiResponse(200, job, "Job updated successfully"));
});

export const getOwnerJobs = asyncHandler(async (req, res) => {
  const ownerId = req.user._id;
  const jobs = await getJobsByOwner(ownerId);
  res.status(200).json(new ApiResponse(200, jobs, "Jobs fetched successfully"));
});

export const filterJobs = asyncHandler(async (req, res) => {
  const ownerId = req.user._id;
  const filters = req.query; // salaryType, experience, jobMode, location, title
  const jobs = await filterJobsService(ownerId, filters);
  res.status(200).json(new ApiResponse(200, jobs, "Filtered jobs fetched"));
});

export const getJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const job = await getJobById(jobId);
  res.status(200).json(new ApiResponse(200, job, "Job fetched successfully"));
});
