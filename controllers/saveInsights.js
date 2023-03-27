import { DomainModel } from "../models/model.js";
import websiteWordCounter from "../services/wordCounter.js";
import moment from "moment";

export default async function saveInsights(url) {
  try {
    let insights = await websiteWordCounter(url);
    let data = {
      name: url,
      fav: false,
      count: insights,
      timestamp: moment.now(),
    };
    let result = await saveDomain(data);
    return result;
  } catch (error) {
    console.log("Error from saveInsights", error);
    throw error;
  }
}

async function saveDomain(data) {
  try {
    const url = new DomainModel(data);
    let saveDomain = url.save();
    if (saveDomain) {
      console.log("Saved data for Domain :-", data);
      return saveDomain;
    }
  } catch (error) {
    console.error("Failed to save data for Domain :-", data, err);
    throw error;
  }
}
