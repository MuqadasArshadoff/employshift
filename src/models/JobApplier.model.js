import mongoose from "mongoose";

const jobApplierSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },

    experience: { type: String, default: "Fresher" },

    resume: { type: String, default: null }, // upload file path

    skills: {
      type: [String],
      default: [],
    },

    education: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("JobApplier", jobApplierSchema);
