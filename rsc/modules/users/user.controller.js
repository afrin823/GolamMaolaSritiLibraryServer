import { catchAsync } from "../../utils/catchAsync.js";
import sendResponse from "../../utils/response.js";
import { userServer } from "./user.server.js";

const createUser = catchAsync(async (req, res) => {
  const { user } = req.body;
  const result = await userServer.createUserDB(user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Create user successfully",
    data: result,
  });
});

export const userController = {
  createUser,
};
