const mongoose = require("mongoose");

const catalogBathsSchema = new mongoose.Schema({
  catalogBathsId: mongoose.Schema.Types.ObjectId,
  titleAZ: String,
  titleEN: String,
  titleRU: String,
});
module.exports = mongoose.model("CatalogBaths", catalogBathsSchema);