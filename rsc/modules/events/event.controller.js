import { catchAsync } from "../../utils/catchAsync.js";
import sendResponse from "../../utils/response.js";
import { eventServer } from "./event.service.js";

const createEvent = catchAsync(async (req, res) => {
  const result = await eventServer.createEventDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Create Event Successfully",
    data: result,
  });
});

const searchEvent = catchAsync(async (req, res) => {
  const result = await eventServer.searchEventDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get Event Successfully",
    data: result,
  });
});

const singleEvent = catchAsync(async (req, res) => {
  const { id } = req.params; 
  const result = await eventServer.getSingleEventDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get single Event Successfully",
    data: result,
  });
});

const deleteEvent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await eventServer.deleteEventDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get single Event Successfully",
    data: result,
  });
});

export const eventController = {
  createEvent,
  searchEvent,
  singleEvent,
  deleteEvent,
};
