import { DomainModel } from "../models/model.js";

export default async function deleteInsight(data) {
  try {
    let { id } = data;
    let result = await DomainModel.deleteOne({ _id: id });
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
