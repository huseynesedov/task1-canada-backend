const CatalogPrice = require("../models/catalogPrice.model");

exports.createCatalogPrice = async (req, res) => {
  try {
    const CatalogPrice = await CatalogPrice.create(req.body);
    res.status(201).json(CatalogPrice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCatalogPrices = async (req, res) => {
  try {
    const CatalogPrices = await CatalogPrice.find();
    res.json(CatalogPrices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCatalogPrices = async (req, res) => {
  try {
    const CatalogPrice = await CatalogPrice.findById(req.params.id);
    if (!CatalogPrice) {
      return res.status(404).json({ error: "CatalogPrice not found" });
    }
    res.json(CatalogPrice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCatalogPrice = async (req, res) => {
  try {
    const CatalogPrice = await CatalogPrice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!CatalogPrice) {
      return res.status(404).json({ error: "CatalogPrice not found" });
    }
    res.json(CatalogPrice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCatalogPrice = async (req, res) => {
  try {
    const CatalogPrice = await CatalogPrice.findByIdAndDelete(req.params.id);
    if (!CatalogPrice) {
      return res.status(404).json({ error: "CatalogPrice not found" });
    }
    res.json({ message: "CatalogPrice deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
