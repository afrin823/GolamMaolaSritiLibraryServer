// import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder.js";
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
  // const queryObj = { ...query };
  // let searchTerm = "";
  // if (query?.searchTerm) {
  //   searchTerm = query.searchTerm.replace(/"/g, "");
  // }
  // const searchQuery = Book.find({
  //   $or: bookSearchingField.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: "i" },
  //   })),
  // });
  // // filtering
  // const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];

  // excludeFields.forEach((el) => delete queryObj[el]);

  // const filterByCategory = searchQuery
  //   .find(queryObj)
  //   .populate("createdBy", "name email role");

  // let sort = "-createdAt";
  // if (query?.sort) {
  //   sort = query.sort;
  // }

  // const sortQuery = filterByCategory.sort(sort);
  // let page = 1;
  // let limit = 1;
  // let skip = 0;

  // if (query?.limit) {
  //   limit = Number(query.limit);
  // }

  // if (query?.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }

  // const paginateQuery = sortQuery.skip(skip);

  // const limitQuery = paginateQuery.limit(limit);

  // Field limiting for specific data

  // let fields = "-__v";
  // if (query?.fields) {
  //   fields = query.fields.split(",").join(" ");
  //   console.log(fields);
  // }

  // const fieldsQuery = await limitQuery.select(fields);
  // return fieldsQuery;

  const bookQuery = new QueryBuilder(Book.find(), query)
    .search(bookSearchingField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bookQuery.modelQuery;
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
