// controllers/jobApplication.controller.js this is old 
import JobApplication from "../models/JobApplication.js";

export const applyForJob = async (req, res) => {
  try {
    const userId = req.user._id;           // from auth middleware
    const { jobId, workExperience, coverLetterDocumentId, otherDocumentIds } = req.body;

    // prevent duplicate application
    const alreadyApplied = await JobApplication.findOne({ userId, jobId });
    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied for this job" });
    }

    const application = await JobApplication.create({
      userId,
      jobId,
      workExperience,
      coverLetterDocumentId,
      otherDocumentIds,
      status: "SUBMITTED",
      statusHistory: [
        {
          status: "SUBMITTED",
          changedBy: userId,
          comment: "Application submitted"
        }
      ]
    });

    res.status(201).json({
      message: "Job applied successfully",
      application
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to apply for job", error });
  }
};
