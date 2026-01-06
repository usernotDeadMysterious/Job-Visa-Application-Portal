import mongoose from "mongoose";

const JOB_STATUS = [
  "SUBMITTED",
  "UNDER_REVIEW",
  "SHORTLISTED",
  "REJECTED",
  "HIRED"
];

const statusHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: JOB_STATUS,
      required: true,
    },
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: { type: String },
    changedAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const jobApplicationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "JobPosting", required: true },

    workExperience: { type: String },
    coverLetterDocumentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
    otherDocumentIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document",
      }
    ],

    status: {
      type: String,
      enum: JOB_STATUS,
      default: "SUBMITTED",
    },

    statusHistory: [statusHistorySchema]
  },
  { timestamps: true }
);

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

export default JobApplication;
