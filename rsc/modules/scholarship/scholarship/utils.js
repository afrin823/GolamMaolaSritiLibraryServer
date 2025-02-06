import { Scholarship } from "./scholarship.model.js";

export const generateRegID = async () => {
  const lastRecord = await Scholarship.findOne().sort({
    "personalInformation.regID": -1,
  });
  if (lastRecord && lastRecord.personalInformation.regID) {
    return (parseInt(lastRecord.personalInformation.regID) + 1).toString();
  }
  return "20250001";
};
