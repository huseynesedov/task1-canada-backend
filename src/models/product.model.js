// src/models/productModel.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  roomNumber: { type: String, required: true },
  catalogTitle: { type: mongoose.Schema.Types.ObjectId, ref: "CatalogTitle", required: true },
  catalogPrice: { type: mongoose.Schema.Types.ObjectId, ref: "CatalogPrice", required: true },
  catalogBed: { type: mongoose.Schema.Types.ObjectId, ref: "CatalogBed", required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
});

module.exports = mongoose.model("Products", productSchema);
