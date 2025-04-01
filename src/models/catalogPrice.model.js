const mongoose = require("mongoose");

const catalogPriceSchema = new mongoose.Schema({
  catalogPriceId: mongoose.Schema.Types.ObjectId,
  countTitleAZ: String,
  countTitleEN: String,
  countTitleRU: String,
});
module.exports = mongoose.model("CatalogPrice", catalogPriceSchema);