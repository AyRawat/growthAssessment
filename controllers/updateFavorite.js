import { DomainModel } from "../models/model.js";

export default async function updateFavorite(url) {
  try {
    const checkFav = await DomainModel.findOne({ name: url });
    if (!checkFav) {
      throw new Error(`The Url:${url} does not exist in DB`);
    }
    let result = await DomainModel.updateMany(
      { name: url },
      {
        $set: {
          fav: !checkFav.fav,
        },
      }
    );
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
