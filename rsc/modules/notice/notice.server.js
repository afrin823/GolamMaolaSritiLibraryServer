import MultiLanguageQueryBuilder from "../../builder/MultiLanguageQueryBuilder.js";
import AppError from "../../error/AppError.js";
import { validateSubCategory } from "../events/event.utils.js";
import {
  AnnualVariousCompetition,
  NationalDayCelebration,
  RegularEvents,
} from "./notice.constant.businessLogin.js";
import { Notice } from "./notice.model.js";

const createNoticeDB = async (payload) => {
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

  const modifiedContent = content.map((item) => ({
    title2: {
      bn: item.title2.bn,
      en: item.title2.en,
    },
    list: item.list,
  }));

  // Save data to the database
  const result = await Notice.create({
    ...payload,
    content: modifiedContent,
  });

  return result;
};

const searchNoticeDB = async (query) => {
  const eventQuery = new MultiLanguageQueryBuilder(Notice.find(), query)
    .search(["title", "description", "category"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await eventQuery.modelQuery;
  return result;
};

const getSingleNoticeDB = async (id) => {
  const result = await Notice.findById(id);
  return result;
};
const deleteNoticeDB = async (id) => {
  const result = await Notice.findByIdAndUpdate(
    id,
    { idDeleted: true },
    { new: true }
  );
  return result;
};

export const noticeServer = {
  createNoticeDB,
  searchNoticeDB,
  getSingleNoticeDB,
  deleteNoticeDB,
};
