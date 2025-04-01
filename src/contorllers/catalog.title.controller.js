const CatalogTitle = require("../models/catalogTitle.model");

exports.createCatalogTitle = async (req, res) => {
  try {
    const catalogTitle = await CatalogTitle.create(req.body);
    res.status(201).json(catalogTitle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCatalogTitles = async (req, res) => {
  try {
    const catalogTitles = await CatalogTitle.find();
    res.json(catalogTitles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCatalogTitle = async (req, res) => {
  try {
    const catalogTitle = await CatalogTitle.findById(req.params.id);
    if (!catalogTitle) {
      return res.status(404).json({ error: "CatalogTitle not found" });
    }
    res.json(catalogTitle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCatalogTitle = async (req, res) => {
  try {
    const catalogTitle = await CatalogTitle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!catalogTitle) {
      return res.status(404).json({ error: "CatalogTitle not found" });
    }
    res.json(catalogTitle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCatalogTitle = async (req, res) => {
  try {
    const catalogTitle = await CatalogTitle.findByIdAndDelete(req.params.id);
    if (!catalogTitle) {
      return res.status(404).json({ error: "CatalogTitle not found" });
    }
    res.json({ message: "CatalogTitle deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
