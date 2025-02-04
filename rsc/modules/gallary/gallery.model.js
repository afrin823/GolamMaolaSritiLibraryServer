import mongoose from "mongoose";

const imageGallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      required: true,
      unique: true,
    },
    singleImage: {
      type: String,
      required: true,
      trim: true,
    },
    imageArray: {
      type: [String],
      default: [],
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
  },
  { timestamps: true }
);

export const ImageGallery = mongoose.model("ImageGallery", imageGallerySchema);
