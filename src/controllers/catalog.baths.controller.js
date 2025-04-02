const CatalogBaths = require("../models/catalogBaths.model");

exports.createCatalogBaths = async (req, res) => {
  try {
    // Gelen veriyi al ve doğrula
    const { countTitleAZ, countTitleEN, countTitleRU } = req.body;

    if (!countTitleAZ || !countTitleEN || !countTitleRU) {
      return res.status(400).json({ error: "All fields (countTitleAZ, countTitleEN, countTitleRU) are required" });
    }

    // Yeni model oluştur
    const catalogBath = new CatalogBaths({
      countTitleAZ,
      countTitleEN,
      countTitleRU,
    });

    // Veriyi kaydet
    await catalogBath.save();

    // Kaydedilen belgeyi ve tüm veriyi döndür (message'yi hariç tutuyoruz, __v'yi tutuyoruz)
    res.status(201).json(catalogBath);  // __v dahil, message hariç
  } catch (error) {
    console.error(error);  // Detaylı hata yazdırma
    res.status(500).json({ error: error.message });
  }
};

exports.getCatalogBaths = async (req, res) => {
  try {
    // Tüm CatalogBaths belgelerini al
    const catalogBaths = await CatalogBaths.find();

    if (catalogBaths.length === 0) {
      return res.status(404).json({ error: "No catalog baths found" });
    }

    // __v'yi tutarak döndürüyoruz
    res.json(catalogBaths);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCatalogByIdBaths = async (req, res) => {
  try {
    const catalogBath = await CatalogBaths.findById(req.params.id);

    if (!catalogBath) {
      return res.status(404).json({ error: "CatalogBath not found" });
    }

    // __v'yi tutarak döndürüyoruz
    res.json(catalogBath);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCatalogBaths = async (req, res) => {
  try {
    const catalogBath = await CatalogBaths.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!catalogBath) {
      return res.status(404).json({ error: "CatalogBath not found" });
    }

    // __v'yi tutarak döndürüyoruz
    res.json(catalogBath);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCatalogBaths = async (req, res) => {
  try {
    const catalogBath = await CatalogBaths.findByIdAndDelete(req.params.id);

    if (!catalogBath) {
      return res.status(404).json({ error: "CatalogBath not found" });
    }

    res.json({
      message: "CatalogBath deleted successfully",
      data: catalogBath,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
