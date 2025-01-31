import { catchAsync } from "../../utils/catchAsync.js";
import sendResponse from "../../utils/response.js";
import { bookServer } from "./book.server.js";

const createBook = catchAsync(async (req, res) => {
  const { data } = req.body;
  const result = await bookServer.createBookDB(data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Create Book Successfully",
    data: result,
  });
});

const getSingleBook = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await bookServer.getSingleBookDB(id);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Get Single Book Successfully",
    data: result,
  });
});

const deleteSingleBook = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await bookServer.deleteBookDB(id);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Delete Single Book Successfully",
    data: result,
  });
});

const getAllBook = catchAsync(async (req, res) => {
  const result = await bookServer.getAllBookDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Book search Successfully",
    data: result,
  });
});

export const bookController = {
  createBook,
  getSingleBook,
  deleteSingleBook,
  getAllBook,
};
