const mongoose = require("mongoose");

const catalogPriceSchema = new mongoose.Schema({
  countTitleAZ: { type: String, required: true },
  countTitleEN: { type: String, required: true },
  countTitleRU: { type: String, required: true },
});
module.exports = mongoose.model("CatalogPrice", catalogPriceSchema);