const Product = require("../models/product.model");

exports.createProduct = async (req, res) => {
  try {
    const { title, description, location, roomNumber, catalogTitle, catalogPrice, catalogBed, latitude, longitude } = req.body;

    // Herhangi bir katalog referansı eksikse hata fırlatılabilir
    if (!catalogTitle || !catalogPrice || !catalogBed) {
      return res.status(400).json({ error: "Catalog references (title, price, bed) are required" });
    }

    // Ürün oluşturuluyor
    const product = await Product.create({
      title,
      description,
      location,
      roomNumber,
      catalogTitle,
      catalogPrice,
      catalogBed,
      latitude,
      longitude,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("catalogTitle catalogPrice catalogBed"); // Ürünlere ilişkin katalog verilerini popüle ediyoruz.

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const { title, description, location, roomNumber, catalogTitle, catalogPrice, catalogBed, latitude, longitude } = req.body;

    // Katalog alanlarını kontrol et
    if (!catalogTitle || !catalogPrice || !catalogBed) {
      return res.status(400).json({ error: "Catalog references (title, price, bed) are required" });
    }

    // Ürün güncelleniyor
    const product = await Product.findByIdAndUpdate(req.params.id, {
      title,
      description,
      location,
      roomNumber,
      catalogTitle,
      catalogPrice,
      catalogBed,
      latitude,
      longitude,
    }, { new: true });

    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};