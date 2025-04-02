const CatalogBed = require("../models/catalogBed.model");

exports.createCatalogBed = async (req, res) => {
  try {
    // Veriyi oluştur
    const catalogBed = new CatalogBed(req.body);
    await catalogBed.save();

    // __v'yi tutarak döndür
    res.status(201).json(catalogBed);  // __v dahil, message hariç
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCatalogBeds = async (req, res) => {
  try {
    // Tüm CatalogBed belgelerini al
    const catalogBeds = await CatalogBed.find();

    if (catalogBeds.length === 0) {
      return res.status(404).json({ error: "No catalog beds found" });
    }

    // __v'yi tutarak döndürüyoruz
    res.json(catalogBeds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCatalogByIdBed = async (req, res) => {
  try {
    const catalogBed = await CatalogBed.findById(req.params.id);

    if (!catalogBed) {
      return res.status(404).json({ error: "CatalogBed not found" });
    }

    // __v'yi tutarak döndürüyoruz
    res.json(catalogBed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCatalogBed = async (req, res) => {
  try {
    const catalogBed = await CatalogBed.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!catalogBed) {
      return res.status(404).json({ error: "CatalogBed not found" });
    }

    // __v'yi tutarak döndürüyoruz
    res.json(catalogBed);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCatalogBed = async (req, res) => {
  try {
    const catalogBed = await CatalogBed.findByIdAndDelete(req.params.id);

    if (!catalogBed) {
      return res.status(404).json({ error: "CatalogBed not found" });
    }

    res.json({
      message: "CatalogBed deleted successfully", // message tutuyoruz
      data: catalogBed,  // Silinen veriyi de döndürüyoruz
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
