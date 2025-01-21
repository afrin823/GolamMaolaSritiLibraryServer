import AppError from "../../error/AppError.js";
import { User } from "./user.mode.js";

const createUserDB = async (payload) => {
  const existUser = await User.findOne({ email: payload.email });
  console.log(existUser);
  if (existUser) {
    throw new AppError(400, "User already exist");
  }
  const newUser = await User.create(payload);
  return newUser;
};

export const userServer = {
  createUserDB,
};
