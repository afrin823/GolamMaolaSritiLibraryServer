import { catchAsync } from "../../utils/catchAsync.js";
import sendResponse from "../../utils/response.js";
import { ImageGalleryServer } from "./gallery.server.js";

const createGallery = catchAsync(async (req, res) => {
  const result = await ImageGalleryServer.createImageGallery(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Successfully gallery created",
    data: result,
  });
});
const getGallery = catchAsync(async (req, res) => {
  const result = await ImageGalleryServer.getAllImageGalleryDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully gallery get",
    data: result,
  });
});
const getSingleGallery = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ImageGalleryServer.getSingleGalleryDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully single gallery get",
    data: result,
  });
});
const updateGallery = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await ImageGalleryServer.updateImageGallery(id, data);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Successfully update gallery ",
    data: result,
  });
});
const deleteSingleGallery = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ImageGalleryServer.deleteImageGallery(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully gallery delete",
    data: result,
  });
});

export const galleryController = {
  createGallery,
  getGallery,
  getSingleGallery,
  deleteSingleGallery,
  updateGallery,
};
