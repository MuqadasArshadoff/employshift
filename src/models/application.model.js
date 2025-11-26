// src/modules/applications/application.model.js
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    jobApplier: { type: mongoose.Schema.Types.ObjectId, ref: "JobApplier", required: true },
    status: { type: String, enum: ["applied","shortlisted","rejected","hired"], default: "applied" },
    resume: { type: String },
    appliedAt: { type: Date, default: Date.now }
});

export const Application = mongoose.model("Application", applicationSchema);
