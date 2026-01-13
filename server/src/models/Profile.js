// Profile Model 
import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    fullName: { type: String, required: true },
    fatherName: { type: String },
    dateOfBirth: { type: Date },
    nationality: { type: String },
    contactNumber: { type: String },
    address: { type: String },
    // you can add more personal fields as needed
  },
  { timestamps: true }
);

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
