const Product = require("../models/product.model");
const School = require('../models/school.model');

const CatalogBed = require("../models/catalogBed.model");
const CatalogPrice = require("../models/catalogPrice.model");
const CatalogBaths = require("../models/catalogBaths.model");

exports.searchProducts = async (req, res) => {
  try {
    const { page = 0, pageSize = 10, filters = [] } = req.body;

    // Filtreleme işlemi
    let query = {};

    // Filtreleme koşulları
    for (const filter of filters) {
      if (filter.fieldName && filter.value) {
        switch (filter.fieldName) {
          case "catalogBed":
            query["catalogBed"] = filter.value;
            break;
          case "catalogPrice":
            query["catalogPrice"] = filter.value;
            break;
          case "CatalogBaths":
            query["CatalogBaths"] = filter.value;
            break;
          case "location": // Konum filtresi ekleme
            if (filter.value && filter.value.coordinates) {
              const { coordinates, maxDistance = 5000 } = filter.value; // Maksimum mesafe (örneğin 5000 metre)
              const [lat, lon] = coordinates;

              query["latitude"] = { $gte: lat - 0.05, $lte: lat + 0.05 };  // Genişleme aralığı
              query["longitude"] = { $gte: lon - 0.05, $lte: lon + 0.05 }; // Genişleme aralığı
            }
            break;
          default:
            query[filter.fieldName] = { $regex: filter.value, $options: "i" };
        }
      }
    }

    // Sayfalama işlemi
    const skip = page * pageSize;
    const limit = pageSize;

    // Ürünleri bulma ve popülasyon işlemi
    const products = await Product.find(query)
      .skip(skip)
      .limit(limit)
      .populate("CatalogBaths catalogPrice catalogBed");

    // Toplam ürün sayısını almak
    const totalProducts = await Product.countDocuments(query);

    // Sayfalama sonucu döndürme
    res.json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / pageSize),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);  // Hata mesajını detaylı şekilde görmek için
    res.status(500).json({ error: error.message });
  }
};



exports.searchSchools = async (req, res) => {
  try {
    const { page = 0, pageSize = 10, filters = [] } = req.body;

    let query = {};

    for (const filter of filters) {
      if (filter.fieldName && filter.value) {
        switch (filter.fieldName) {
          case "location":
            // Konum metni ile eşleşme (case-insensitive)
            query["location"] = { $regex: filter.value, $options: "i" };
            break;

          case "title":
          case "description":
            // Metin bazlı arama (case-insensitive)
            query[filter.fieldName] = { $regex: filter.value, $options: "i" };
            break;

          default:
            // Diğer alanlar doğrudan eşleştirilir
            query[filter.fieldName] = filter.value;
        }
      }
    }

    const skip = page * pageSize;
    const limit = pageSize;

    const schools = await School.find(query)
      .skip(skip)
      .limit(limit);

    const totalSchools = await School.countDocuments(query);

    res.json({
      schools,
      totalSchools,
      totalPages: Math.ceil(totalSchools / pageSize),
      currentPage: page,
    });

  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: error.message });
  }
};

