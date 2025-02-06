import { catchAsync } from "../../utils/catchAsync.js";
import sendResponse from "../../utils/response.js";
import { noticeServer } from "./notice.server.js";

const createNotice = catchAsync(async (req, res) => {
  const result = await noticeServer.createNoticeDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Create Event Successfully",
    data: result,
  });
});

const searchNotice = catchAsync(async (req, res) => {
  const result = await noticeServer.searchNoticeDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Notice get Successfully",
    data: result,
  });
});

const singleNotice = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await noticeServer.getSingleNoticeDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get single Notice Successfully",
    data: result,
  });
});

const deleteNotice = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await noticeServer.deleteNoticeDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get single Event Successfully",
    data: result,
  });
});
export const noticeController = {
  createNotice,
  searchNotice,
  singleNotice,
  deleteNotice,
};
