import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
    title2: {
      bn: { type: String, required: true },
      en: { type: String, required: true }
    },
    list: [
      {
        bn: { type: String, required: true },
        en: { type: String, required: true },
      },
    ],
  });
  

const noticeSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User id is required"],
      ref: "userCollection",
    },
    title: {
      type: Map,
      of: String,
      required: true,
    },
    description: {
      type: Map,
      of: String,
      required: true,
    },
    remark: {
      type: Map,
      of: String,
      required: true,
    },
    year: {
      type: Map,
      of: String,
      required: true,
    },
    date: {
      type: Map,
      of: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default:true
    },
    category: {
      bn: {
        type: String,
        enum: [
          "জাতীয় দিবস উদযাপন",
          "বার্ষিক বিভিন্ন প্রতিযোগিতা",
          "নিয়মিত আয়োজন",
        ],
        required: true,
      },
      en: {
        type: String,
        enum: [
          "National Day Celebration",
          "Annual Various Competition",
          "Regular Events",
        ],
        required: true,
      },
    },
    subCategory: {
      bn: {
        type: String,
        enum: [
          "আন্তর্জাতিক মাতৃভাষা দিবস", //  "জাতীয় দিবস উদযাপন"
          "স্বাধীনতা দিবস", //  "জাতীয় দিবস উদযাপন"
          "বিজয় দিবস", //  "জাতীয় দিবস উদযাপন"
          "বিশ্ব পরিবেশ দিবস", //  "জাতীয় দিবস উদযাপন"
          "বিতর্ক",// বার্ষিক বিভিন্ন প্রতিযোগিতা
          "সাধারণ জ্ঞান", // বার্ষিক বিভিন্ন প্রতিযোগিতা
          "বই পড়া কর্মসূচী", // বার্ষিক বিভিন্ন প্রতিযোগিতা
          "কোরআন, সীরাহ এবং হাদীস প্রতিযোগিতা", // বার্ষিক বিভিন্ন প্রতিযোগিতা
          "শুদ্ধাচার জ্ঞান প্রতিযোগিতা", // বার্ষিক বিভিন্ন প্রতিযোগিতা
          "পাঠচক্র", // নিয়মিত আয়োজন
          "বার্ষিক ক্রীড়া ও সাংস্কৃতিক প্রতিযোগিতা", // নিয়মিত আয়োজন
        ],
        required: true,
      },
      en: {
        type: String,
        enum: [
          "International Mother Language Day", //National Day Celebration
          "Independence Day", //National Day Celebration
          "Victory Day", //National Day Celebration
          "World Environment Day", //National Day Celebration
          "Debating", //Annual Various Competition
          "General Knowledge", //Annual Various Competition
          "Book Reading Program", //Annual Various Competition
          "Quran, Seerah and Hadith", //Annual Various Competition
          "Good Behavior Knowledge", //Annual Various Competition
          "Study Circle", // Regular Events
          "Annual Sports and Cultural Competition", // Regular Events
        ],
        required: true,
      },
    },
    idDeleted: {
      type: Boolean,
      default: false,
    },
    content: {
      type: [listSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Notice = mongoose.model("noticeCollection", noticeSchema);
