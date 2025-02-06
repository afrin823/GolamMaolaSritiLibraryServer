import AppError from "../../../error/AppError.js";
import { Scholarship } from "./scholarship.model.js";
import { generateRegID } from "./utils.js";

const createScholarship = async (payload) => {
  console.log(payload);
  const {
    name,
    dateOfBirth,
    profilePicture,
    currentClass,
    institution,
    mobileNumber,
  } = payload.personalInformation;

  const existingUser = await Scholarship.findOne({
    $or: [{ "personalInformation.mobileNumber": mobileNumber }],
  });

  if (existingUser) {
    throw new AppError(
      400,
      "This mobile number is already registered."
    );
  }
  if (mobileNumber.length !== 11) {
    throw new AppError(400, "This mobile number is not correct");
  }

  const regID = await generateRegID();

  const result = await Scholarship.create({
    personalInformation: {
      name,
      regID,
      dateOfBirth,
      profilePicture,
      currentClass,
      institution,
      mobileNumber,
    },
  });
  return result;
};

export const scholarshipServer = {
  createScholarship,
};
