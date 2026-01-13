// Document Model 

import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: [
        "Profile Image",
        "CV",
        "DEGREE",
        "TRANSCRIPT",
        "PASSPORT",
        "Invitation Letter",
        "VISA_SUPPORTING",
        "JOB_SUPPORTING",
        "COVER_LETTER",
        "OTHER",
      ],
      required: true,
    },
    filePath: {
      type: String, // local path or URL
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'VERIFIED', 'REJECTED'],
      default: 'PENDING',
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    verifiedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Document = mongoose.model('Document', documentSchema);

export default Document;
