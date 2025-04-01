const CatalogBaths = require("../models/catalogBaths.model");

exports.createCatalogBaths = async (req, res) => {
  try {
    const CatalogBaths = await CatalogBaths.create(req.body);
    res.status(201).json(CatalogBaths);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCatalogBathss = async (req, res) => {
  try {
    const CatalogBathss = await CatalogBaths.find();
    res.json(CatalogBathss);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCatalogBaths = async (req, res) => {
  try {
    const CatalogBaths = await CatalogBaths.findById(req.params.id);
    if (!CatalogBaths) {
      return res.status(404).json({ error: "CatalogBaths not found" });
    }
    res.json(CatalogBaths);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCatalogBaths = async (req, res) => {
  try {
    const CatalogBaths = await CatalogBaths.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!CatalogBaths) {
      return res.status(404).json({ error: "CatalogBaths not found" });
    }
    res.json(CatalogBaths);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCatalogBaths = async (req, res) => {
  try {
    const CatalogBaths = await CatalogBaths.findByIdAndDelete(req.params.id);
    if (!CatalogBaths) {
      return res.status(404).json({ error: "CatalogBaths not found" });
    }
    res.json({ message: "CatalogBaths deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
