import QueryBuilder from "../../builder/QueryBuilder.js";
import { Message } from "./message.model.js";

const createMessage = async (payload) => {
  const result = await Message.create(payload);
  return result;
};
const getAllMessageDB = async (query) => {
  const messageSearchingField = ["name", "phone"];
  const messageQuery = new QueryBuilder(Message.find(), query)
    .search(messageSearchingField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await messageQuery.modelQuery;
  return result;
};

const updateMessageDB = async (id) => {
  const result = await Message.findByIdAndUpdate(
    id,
    { isRead: true },
    { new: true }
  );
  return result;
};

const deleteMessage = async (id) => {
  const result = await Message.findByIdAndDelete(id);
  return result;
};
export const messageServer = {
  createMessage,
  getAllMessageDB,
  deleteMessage,
  updateMessageDB,
};
