import express from "express";
import saveInsights from "../controllers/saveInsights.js";
import deleteInsight from "../controllers/deleteInsights.js";
import deleteInsightById from "../controllers/deleteInsightById.js";
import updateFavorite from "../controllers/updateFavorite.js";
import getAllInsights from "../controllers/getAllInsights.js";
import isUrlHttp from "is-url-http";

export const router = express.Router();

//Verify whether a Url is valid or not
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

//List all Insights
router.get("/listAll", async (req, res) => {
  try {
    let result = await getAllInsights();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.send({ message: "Failed to get Insights", error: err.message });
  }
});
//Get Insights about the site, and save the site details
router.post("/saveInsights", async (req, res) => {
  try {
    if (!req.body.url) {
      throw new Error("URL is missing");
    }
    const url = req.body.url;
    if (!isUrlHttp(url)) {
      throw new Error("URL is not Valid.");
    }
    const result = await saveInsights(url);
    res.status(200).send(result);
  } catch (err) {
    console.log("Error from routes", err);
    res
      .status(400)
      .send({ message: "Failed to get Insights", error: err.message });
  }
});

//Remove All Insights
router.delete("/deleteInsights", async (req, res) => {
  try {
    if (!req.body.url) {
      throw new Error("URL is missing");
    }
    const result = await deleteInsight(req.body.url);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .send({ message: "Failed to delete the insight", error: err.message });
  }
});
//Remove Insight By Id
router.delete("/deleteInsightById", async (req, res) => {
  try {
    if (!req.body.id) {
      throw new Error("Id is Missing");
    }
    let data = {
      id: req.body.id,
    };
    let result = await deleteInsightById(data);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .send({ message: "Failed to delete the insight", error: err.message });
  }
});
//Add to Fav
router.put("/updateFavorite", async (req, res) => {
  try {
    if (!req.body.url) {
      throw new Error("URL is missing");
    }
    const url = req.body.url;
    if (!isValidUrl(url)) {
      throw new Error("The URL is not valid");
    }
    const result = await updateFavorite(url);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .send({ message: "Failed to update the favorite", error: err.message });
  }
});

//module.exports = {router};
