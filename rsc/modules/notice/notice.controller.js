import { catchAsync } from "../../utils/catchAsync.js";
import sendResponse from "../../utils/response.js";
import { noticeServer } from "./notice.server.js";

const createNotice = catchAsync(async (req, res) => {
  const result = await noticeServer.createNoticeDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Create Event Successfully",
    data: result,
  });
});
export const noticeController = {
  createNotice,
};
