import QueryBuilder from "../../builder/QueryBuilder.js";
import { ImageGallery } from "./gallery.model.js";

const createImageGallery = async (payload) => {
  const result = await ImageGallery.create(payload);
  return result;
};
const getAllImageGalleryDB = async (query) => {
  const ImageGallerySearchingField = ["title"];
  const galleryQuery = new QueryBuilder(ImageGallery.find(), query)
    .search(ImageGallerySearchingField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await galleryQuery.modelQuery;
  return result;
};

const getSingleGalleryDB = async (id) => {
  const result = await ImageGallery.findById(id);
  return result;
};
const updateImageGallery = async (id, updateData) => {
  const updatedGallery = await ImageGallery.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  );
  return updatedGallery;
};

const deleteImageGallery = async (id) => {
  const result = await ImageGallery.findByIdAndDelete(id, { new: true });
  return result;
};
export const ImageGalleryServer = {
  createImageGallery,
  getSingleGalleryDB,
  getAllImageGalleryDB,
  deleteImageGallery,
  updateImageGallery,
};
