const mongoose = require("mongoose");

const catalogTitleSchema = new mongoose.Schema({
  catalogTitleId: mongoose.Schema.Types.ObjectId,
  titleAZ: String,
  titleEN: String,
  titleRU: String,
});
module.exports = mongoose.model("CatalogTitle", catalogTitleSchema);