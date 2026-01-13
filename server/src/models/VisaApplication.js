import mongoose from 'mongoose';

const { Schema } = mongoose;

const VISA_STATUS = [
  'SUBMITTED',
  'UNDER_REVIEW',
  'APPROVED',
  'REJECTED',
  'CANCELLED',
];

const statusHistorySchema = new Schema(
  {
    status: {
      type: String,
      enum: VISA_STATUS,
      required: true,
    },
    changedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comment: {
      type: String,
    },
    changedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const visaApplicationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    passportDetails: {
      number: { type: String, required: true },
      country: { type: String, required: true },
      issueDate: { type: Date },
      expiryDate: { type: Date, required: true },
    },
    purposeOfVisit: {
      type: String,
      required: true,
    },
    travelHistory: {
      type: String, // you can later make this an array of sub-docs if needed
    },
    supportingDocumentIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Document',
      },
    ],
    applicationFee: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: VISA_STATUS,
      default: 'SUBMITTED',
    },
    statusHistory: [statusHistorySchema],
  },
  { timestamps: true }
);

const VisaApplication = mongoose.model(
  'VisaApplication',
  visaApplicationSchema
);

export default VisaApplication;
