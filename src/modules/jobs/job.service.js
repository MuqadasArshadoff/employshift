// src/modules/jobs/job.service.js
import { Job } from "./job.model.js";

export const createJobService = async (ownerId, data) => {
    const job = await Job.create({ ...data, owner: ownerId });
    return job;
};

export const updateJobService = async (ownerId, jobId, data) => {
    const job = await Job.findOneAndUpdate(
        { _id: jobId, owner: ownerId },
        data,
        { new: true }
    );
    if (!job) throw new Error("Job not found");
    return job;
};

export const getJobsByOwner = async (ownerId) => {
    return await Job.find({ owner: ownerId });
};

export const filterJobsService = async (ownerId, filters) => {
    return await Job.find({ owner: ownerId, ...filters });
};

export const getJobById = async (jobId) => {
    return await Job.findById(jobId);
};
