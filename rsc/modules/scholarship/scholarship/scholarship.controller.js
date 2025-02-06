import { catchAsync } from "../../../utils/catchAsync.js";
import sendResponse from "../../../utils/response.js";
import { scholarshipServer } from "./scholarship.server.js";

const createScholarship = catchAsync(async (req, res) => {
  const result = await scholarshipServer.createScholarship(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Submit Scholarship Successfully ",
    data: result,
  });
});

export const scholarshipController = {
  createScholarship,
};
