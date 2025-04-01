const CatalogBed = require("../models/catalogBed.model");

exports.createCatalogBed = async (req, res) => {
  try {
    const CatalogBed = await CatalogBed.create(req.body);
    res.status(201).json(CatalogBed);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCatalogBeds = async (req, res) => {
  try {
    const CatalogBeds = await CatalogBed.find();
    res.json(CatalogBeds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCatalogBeds = async (req, res) => {
  try {
    const CatalogBed = await CatalogBed.findById(req.params.id);
    if (!CatalogBed) {
      return res.status(404).json({ error: "CatalogBed not found" });
    }
    res.json(CatalogBed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCatalogBed = async (req, res) => {
  try {
    const CatalogBed = await CatalogBed.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!CatalogBed) {
      return res.status(404).json({ error: "CatalogBed not found" });
    }
    res.json(CatalogBed);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCatalogBed = async (req, res) => {
  try {
    const CatalogBed = await CatalogBed.findByIdAndDelete(req.params.id);
    if (!CatalogBed) {
      return res.status(404).json({ error: "CatalogBed not found" });
    }
    res.json({ message: "CatalogBed deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
