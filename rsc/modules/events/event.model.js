import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  title2: { type: String, required: true },
  list: [
    {
      bn: { type: String, required: true },
      en: { type: String, required: true },
    },
  ],
});

const eventSchema = new mongoose.Schema(
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
    image: {
      type: String,
      required: true,
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

export const Event = mongoose.model("eventCollection", eventSchema);
