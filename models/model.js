import mongoose from "mongoose";

const DomainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fav: {
    type: Boolean,
    default: false,
  },
  count: {
    type: String,
  },
  timestamp: {
    type: Date,
  },
});

export const DomainModel = mongoose.model("Domain", DomainSchema);
//module.exports = DomainModel;
