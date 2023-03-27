import { DomainModel } from "../models/model.js";

export default async function getAllInsights() {
  try {
    let result = await DomainModel.find().sort({ timestamp: -1 });
    if (result) {
      return result;
    }
  } catch (err) {
    console.log(err);
  }
}
