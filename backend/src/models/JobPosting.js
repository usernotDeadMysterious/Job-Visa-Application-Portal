import mongoose from "mongoose";

const jobPostingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    industry: { type: String, required: true },
    position: { type: String, required: true },
    description: { type: String },
    requirements: { type: String },
    city: { type: String },
    country: { type: String },
    
    type: { type: String },
    isActive: { type: Boolean, default: true },
    salary: {
      type: String, // keep string for ranges like "$800 - $1200"
      default: "Not disclosed",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // admin user
    }
  },
  { timestamps: true }
);

const JobPosting = mongoose.model("JobPosting", jobPostingSchema);

export default JobPosting;
