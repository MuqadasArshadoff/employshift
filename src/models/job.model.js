// src/modules/jobs/job.model.js
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "CompanyOwner", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    jobType: { type: String, enum: ["onsite","remote","hybrid"], default: "onsite" },
    salaryType: { type: String, enum: ["monthly","weekly","hourly","daily"], default: "monthly" },
    experience: { type: Number, default: 0 },
    skills: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

export const Job = mongoose.model("Job", jobSchema);
