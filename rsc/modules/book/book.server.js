// import httpStatus from "http-status";
import AppError from "../../error/AppError.js";
import { bookSearchingField } from "./book.constant.js";
import { Book } from "./book.model.js";

const createBookDB = async (payload) => {
  const isExist = await Book.findOne({
    bookName: payload.bookName,
    publisher: payload.publisher,
    edition: payload.edition,
  });
  if (isExist) {
    throw new AppError(400, "This book already Exist");
  }
  const result = await Book.create(payload);
  return result;
};

const getAllBookDB = async (query) => {
  let searchTerm = "";
  if (query?.searchTerm) {
    searchTerm = query.searchTerm.replace(/"/g, "");
  }
  const searchQuery = Book.find({
    $or: bookSearchingField.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });
// filtering
  const excludeFields = ["searchTerm"]

  const result = await searchQuery
    .find(query)
    .populate("createdBy", "name email role");
  return result;
};

const getSingleBookDB = async (id) => {
  const result = await Book.findById(id);
  if (!result) {
    throw new AppError(400, "This book not found");
  }
  return result;
};

const deleteBookDB = async (id) => {
  const result = await Book.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const bookServer = {
  createBookDB,
  getSingleBookDB,
  deleteBookDB,
  getAllBookDB,
};
