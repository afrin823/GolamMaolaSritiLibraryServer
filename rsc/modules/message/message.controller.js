import { catchAsync } from "../../utils/catchAsync.js";
import sendResponse from "../../utils/response.js";
import { messageServer } from "./message.server.js";

const createMessage = catchAsync(async (req, res) => {
  const result = await messageServer.createMessage(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Successfully message send",
    data: result,
  });
});
const getAllMessage = catchAsync(async (req, res) => {
  const result = await messageServer.getAllMessageDB(req.query);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Successfully get message  ",
    data: result,
  });
});
const updateSingleMessage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await messageServer.updateMessageDB(id);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Successfully message  read",
    data: result,
  });
});
const deleteSingleMessage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await messageServer.deleteMessage(id);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Successfully message  delete",
    data: result,
  });
});

export const messageController = {
  createMessage,
  getAllMessage,
  deleteSingleMessage,
  updateSingleMessage,
};
