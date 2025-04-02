const Product = require("../models/product.model");
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
          case "catalogBedId":
          case "catalogPriceId":
          case "catalogBathsId":
            query["catalogs"] = { $in: [filter.value] }; 
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
