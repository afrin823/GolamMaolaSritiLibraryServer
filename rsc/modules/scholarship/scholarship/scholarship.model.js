import mongoose from "mongoose";

const scholarshipPersonSchema = new mongoose.Schema(
  {
    personalInformation: {
      name: { type: String, required: true },
      regID: { type: String, required: true, unique: true },
      dateOfBirth: { type: Date, required: true },
      profilePicture: { type: String },
      currentClass: { type: String, required: true },
      institution: { type: String, required: true },
      mobileNumber: { type: String, required: true, unique: true },
    },
  },
  { timestamps: true }
);

export const Scholarship = mongoose.model(
  "Scholarship",
  scholarshipPersonSchema
);
