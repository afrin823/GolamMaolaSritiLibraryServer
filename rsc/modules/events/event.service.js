import MultiLanguageQueryBuilder from "../../builder/MultilanguageQueryBuilder.js";
import AppError from "../../error/AppError.js";
import {
    AnnualVariousCompetition,
    NationalDayCelebration,
    RegularEvents,
} from "./event.constant.businessLogic.js";
import { Event } from "./event.model.js";
import { validateSubCategory } from "./event.utils.js";

const createEventDB = async (payload) => {
  const {
    createdBy,
    title,
    description,
    remark,
    image,
    content,
    category,
    subCategory,
  } = payload;

  if (
    !createdBy ||
    !title ||
    !description ||
    !remark ||
    !image ||
    !content ||
    !category ||
    !subCategory
  ) {
    throw new AppError(400, "All fields are required");
  }

  // Title, description, remark validation
  if (!title.bn || !title.en) {
    throw new AppError(400, "Title must contain both Bangla and English");
  }
  if (!description.bn || !description.en) {
    throw new AppError(400, "Description must contain both Bangla and English");
  }
  if (!remark.bn || !remark.en) {
    throw new AppError(400, "Remark must contain both Bangla and English");
  }

  // Checking Category and Validating SubCategory
  if (
    category.bn === "জাতীয় দিবস উদযাপন" ||
    category.en === "National Day Celebration"
  ) {
    validateSubCategory(subCategory, NationalDayCelebration);
  }

  if (
    category.bn === "বার্ষিক বিভিন্ন প্রতিযোগিতা" ||
    category.en === "Annual Various Competition"
  ) {
    validateSubCategory(subCategory, AnnualVariousCompetition);
  }
  if (category.bn === "নিয়মিত আয়োজন" || category.en === "Regular Events") {
    validateSubCategory(subCategory, RegularEvents);
  }

  // Content validation
  if (content && content.length > 0) {
    content.forEach((item) => {
      if (!item.title2.bn || !item.title2.en) {
        throw new AppError(
          400,
          "Content 'title2' must contain both Bangla and English"
        );
      }

      if (item.list && item.list.length > 0) {
        item.list.forEach((listItem) => {
          if (!listItem.bn || !listItem.en) {
            throw new AppError(
              400,
              "Each list item must contain both Bangla and English"
            );
          }
        });
      }
    });
  }

  // Modify content before saving
  const modifiedContent = content.map((item) => ({
    title2: `${item.title2.bn} / ${item.title2.en}`,
    list: item.list,
  }));

  // Save data to the database
  const result = await Event.create({
    ...payload,
    content: modifiedContent,
  });

  return result;
};

const searchEventDB = async (query) => {
  const eventQuery = new MultiLanguageQueryBuilder(Event.find(), query)
    .search(["title", "description", "category"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await eventQuery.modelQuery;
  return result;
};

const getSingleEventDB = async (id) => {
  const result = await Event.findById(id);
  return result;
};
const deleteEventDB = async (id) => {
  const result = await Event.findByIdAndUpdate(
    id,
    { idDeleted: true },
    { new: true }
  );
  return result;
};

export const eventServer = {
  createEventDB,
  searchEventDB,
  getSingleEventDB,
  deleteEventDB,
};

// search(searchableFields) {
//   const searchTerm = this?.query?.searchTerm;
//   if (searchTerm) {
//     this.modelQuery = this.modelQuery.find({
//       $or: searchableFields.map((field) => ({
//         [field]: { $regex: searchTerm, $options: "i" },
//       })),
//     });
//   }
//   return this;
// }
