import VisaApplication from "../models/VisaApplication.js";

export const applyForVisa = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const {
      passportDetails,
      purposeOfVisit,
      travelHistory,
      supportingDocumentIds = [],
    } = req.body;

    if (
      !passportDetails ||
      !passportDetails.number ||
      !passportDetails.country ||
      !passportDetails.expiryDate ||
      !purposeOfVisit
    ) {
      return res.status(400).json({
        message: "Required fields are missing",
        status:false,
      });
    }

    const visaApplication = await VisaApplication.create({
      userId,
      passportDetails,
      purposeOfVisit,
      travelHistory,
      supportingDocumentIds,
      status: "SUBMITTED",
      statusHistory: [
        {
          status: "SUBMITTED",
          changedBy: userId,
          comment: "Visa application submitted",
        },
      ],
    });

    return res.status(201).json({
      message: "Visa application submitted successfully",
      status:true,
      data: visaApplication,
    });
  } catch (error) {
    // console error when needed 
    console.error("Apply Visa Error:");
    return res.status(500).json({
      message: "Failed to submit visa application",
      status:false,
    });
  }
};

export const getMyVisaApplications = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const applications = await VisaApplication.find({ userId })
      .populate({
        path: "supportingDocumentIds",
        select: "originalName filePath status createdAt",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      data: applications,
    });
  } catch (error) {
    console.error("Get Visa Apps Error:", error);
    return res.status(500).json({
      message: "Failed to fetch visa applications",
      status:false,
    });
  }
};
export const getVisaApplicationById = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { id } = req.params;

    const application = await VisaApplication.findOne({
      _id: id,
      userId,
    }).populate({
      path: "supportingDocumentIds",
      select: "originalName filePath status createdAt",
    });

    if (!application) {
      return res.status(404).json({
        message: "Visa application not found",
        status:false,
      });
    }

    return res.status(200).json({
      data: application,
    });
  } catch (error) {
    console.error("Get Visa App Error:", error);
    return res.status(500).json({
      message: "Failed to fetch visa application",
      status:false,
    });
  }
};

