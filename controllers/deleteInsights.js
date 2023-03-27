import { DomainModel } from "../models/model.js";

export default async function deleteInsight(url) {
  try {
    let result = await DomainModel.deleteMany({ name: url });
    if (result) {
      if (result.deletedCount == 0) {
        return { Message: "0 records deleted" };
      }
      return { message: `No. of Rows Deleted: ${result.deletedCount}` };
    } else {
      return "Failed to Delete";
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}
