const CatalogPrice = require("../models/catalogPrice.model");

exports.createCatalogPrice = async (req, res) => {
  try {
    // Veriyi oluştur
    const catalogPrice = new CatalogPrice(req.body);
    await catalogPrice.save();

    // __v'yi tutarak döndür
    res.status(201).json(catalogPrice);  // __v dahil, message hariç
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCatalogPrices = async (req, res) => {
  try {
    // Tüm CatalogPrice belgelerini al
    const catalogPrices = await CatalogPrice.find();

    if (catalogPrices.length === 0) {
      return res.status(404).json({ error: "No catalog prices found" });
    }

    // __v'yi tutarak döndürüyoruz
    res.json(catalogPrices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCatalogByIdPrice = async (req, res) => {
  try {
    const catalogPrice = await CatalogPrice.findById(req.params.id);

    if (!catalogPrice) {
      return res.status(404).json({ error: "CatalogPrice not found" });
    }

    // __v'yi tutarak döndürüyoruz
    res.json(catalogPrice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCatalogPrice = async (req, res) => {
  try {
    const catalogPrice = await CatalogPrice.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!catalogPrice) {
      return res.status(404).json({ error: "CatalogPrice not found" });
    }

    // __v'yi tutarak döndürüyoruz
    res.json(catalogPrice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCatalogPrice = async (req, res) => {
  try {
    const catalogPrice = await CatalogPrice.findByIdAndDelete(req.params.id);

    if (!catalogPrice) {
      return res.status(404).json({ error: "CatalogPrice not found" });
    }

    // __v'yi tutarak döndürüyoruz ve message hariç tutuyoruz
    res.json({
      data: catalogPrice,  // Silinen veriyi döndürüyoruz
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
