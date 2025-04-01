const mongoose = require("mongoose");

const catalogBedSchema = new mongoose.Schema({
  catalogBedId: mongoose.Schema.Types.ObjectId,
  countTitleAZ: String,
  countTitleEN: String,
  countTitleRU: String,
});
module.exports = mongoose.model("CatalogBed", catalogBedSchema);


