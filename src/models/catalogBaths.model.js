const mongoose = require("mongoose");

const catalogBathsSchema = new mongoose.Schema({
  countTitleAZ: { type: String, required: true },
  countTitleEN: { type: String, required: true },
  countTitleRU: { type: String, required: true },
});

module.exports = mongoose.model("CatalogBaths", catalogBathsSchema);