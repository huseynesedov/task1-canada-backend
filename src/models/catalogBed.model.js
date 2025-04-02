const mongoose = require("mongoose");

const catalogBedSchema = new mongoose.Schema({
  countTitleAZ: { type: String, required: true },
  countTitleEN: { type: String, required: true },
  countTitleRU: { type: String, required: true },
});
module.exports = mongoose.model("CatalogBed", catalogBedSchema);


