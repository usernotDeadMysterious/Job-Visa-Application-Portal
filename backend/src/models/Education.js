import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    highestQualification: { type: String, required: true },
    institutionName: { type: String, required: true },
    yearOfPassing: { type: Number },
    major: { type: String },
    gradesCgpa: { type: String },
  },
  { timestamps: true }
);

// You can keep multiple education records per user
const Education = mongoose.model('Education', educationSchema);

export default Education;
