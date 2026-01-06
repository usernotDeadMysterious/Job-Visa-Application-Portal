// this is new 
import Profile from "../models/Profile.js";
import Education from "../models/Education.js";
import Document from "../models/Document.js";
import JobApplication from "../models/JobApplication.js";

export const applyForJob = async (req, res) => {
  try {
    const userId = req.user._id;
    const { jobId, workExperience } = req.body;

    // prevent duplicate
    const exists = await JobApplication.findOne({ userId, jobId });
    if (exists) {
      return res.status(400).json({ message: "Already applied" });
    }

    /* ===================== */
    /* FETCH OVERVIEW DATA   */
    /* ===================== */

    const profile = await Profile.findOne({ userId });
    const education = await Education.findOne({ userId }).sort({ yearOfPassing: -1 });
    const documents = await Document.find({ userId });

    if (!profile || !education) {
      return res.status(400).json({
        message: "Complete profile & education before applying",
      });
    }

    /* ===================== */
    /* CREATE APPLICATION    */
    /* ===================== */

    const application = await JobApplication.create({
      userId,
      jobId,

      personalDetails: {
        fullName: profile.fullName,
        fatherName: profile.fatherName,
        nationality: profile.nationality,
        contactNumber: profile.contactNumber,
        dateOfBirth: profile.dateOfBirth,
        address: profile.address,
      },

      educationDetails: {
        highestQualification: education.highestQualification,
        institutionName: education.institutionName,
        major: education.major,
        yearOfPassing: education.yearOfPassing,
        gradesCgpa: education.gradesCgpa,
      },

      documents: documents.map((doc) => ({
        type: doc.type,
        filePath: doc.filePath,
      })),

      workExperience,

      status: "SUBMITTED",
      statusHistory: [
        {
          status: "SUBMITTED",
          changedBy: userId,
          comment: "Application submitted",
        },
      ],
    });

    res.status(201).json({
      message: "Job applied successfully",
      application,
    });
  } catch (err) {
    res.status(500).json({ message: "Apply failed", error: err.message });
  }
};
