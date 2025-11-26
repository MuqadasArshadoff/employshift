// src/modules/applications/application.service.js
import { Application } from "./application.model.js"; // ✅ correct



export const applyJobService = async (jobApplierId, data) => {
    const application = await Application.create({
        ...data,
        jobApplier: jobApplierId
    });
    return application;
};

export const getApplicationsService = async () => {
    return await Application.find().populate("job jobApplier");
};

export const updateApplicationService = async (appId, data) => {
    const application = await Application.findByIdAndUpdate(appId, data, { new: true });
    if (!application) throw new Error("Application not found");
    return application;
};

export const getApplicationsByJob = async (jobId) => {
    return await Application.find({ job: jobId }).populate("job jobApplier");
};
