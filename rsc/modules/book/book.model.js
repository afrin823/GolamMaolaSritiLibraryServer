import mongoose, { Schema } from "mongoose";

const bookSchema = mongoose.Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      ref: "userCollection",
    },
    bookName: {
      type: String,
      require: true,
    },
    registrationNo: {
      type: String,
    },
    image: {
      type: String,
      require: true,
    },
    writerName: {
      type: String,
      require: true,
    },
    publisher: {
      type: String,
      require: true,
    },
    year: {
      type: String,
      require: true,
    },
    edition: {
      type: String, // সংস্করণ (যেমন: ১ম, ২য়)
    },
    ISBN: {
      type: String, // আন্তর্জাতিক স্ট্যান্ডার্ড বুক নম্বর
      unique: true,
    },
    language: {
      type: String,
      default: "Unknown",
    },
    pages: {
      type: Number,
    },
    isRestricted: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    quantity: {
      type: Number,
      min: [1, "Quantity cannot be less than 1"],
      require: true,
    },
    category: {
      type: String,
      default: "no select", //
    },
    bookshelfLocation: {
      type: String,
      default: "no select",
    },
    tags: {
      type: [String], // ট্যাগ (যেমন: "ফিকশন", "বিজ্ঞান", "ইতিহাস")
    },
    description: {
      type: String,
    },
    comment: {
      type: String,
    },
    rating: {
      type: [Number],
      validate: {
        validator: function (arr) {
          return arr.every((num) => num >= 1 && num <= 5);
        },
        message: "Each rating must be between 1 and 5",
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model("bookCollection", bookSchema);
