const Product = require("../models/product.model");
const multer = require("multer");
const path = require('path'); // path modülünü doğru şekilde dahil edin
const fs = require('fs');
const { default: mongoose } = require("mongoose");



// Dosya yükleme ayarları
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploads/product';

    // 'uploads' klasörü mevcut değilse oluştur
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath); // Dosya yükleme hedefi olarak 'uploads' klasörünü belirt
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // Dosya uzantısını al
    const timestamp = Date.now(); // Zaman damgası
    cb(null, `${timestamp}${ext}`); // Dosya adı zaman damgası ve uzantı ile kaydedilecek
  }
});

// Dosya yükleme middleware
const upload = multer({ storage: storage }).fields([
  { name: 'mainRoomImg', maxCount: 1 },
  { name: 'roomImgs', maxCount: 5 }
]);



// createProduct fonksiyonu
exports.createProduct = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Dosya kontrolü
      if (!req.files || !req.files.mainRoomImg || !req.files.roomImgs) {
        return res.status(400).json({ error: "Image files are missing" });
      }

      const { title, description, location, roomNumber, CatalogBaths, catalogPrice, catalogBed, latitude, longitude } = req.body;

      // CatalogBaths, catalogPrice, catalogBed değerlerini ObjectId'ye dönüştürme
      const catalogBathsId = new mongoose.Types.ObjectId(CatalogBaths);
      const catalogPriceId = new mongoose.Types.ObjectId(catalogPrice);
      const catalogBedId = new mongoose.Types.ObjectId(catalogBed);


      // URL için dinamik URL oluşturma
      const mainRoomImgUrl = `https://canadabackend.huseyn.online/uploads/product/room/${req.files.mainRoomImg[0].filename}`;
      const roomImgsUrls = req.files.roomImgs.map(file => `https://canadabackend.huseyn.online/uploads/product/rooms/${file.filename}`);

      // Yeni ürün oluşturma
      const newProduct = new Product({
        title,
        mainRoomImg: mainRoomImgUrl,
        roomImgs: roomImgsUrls,
        description,
        location,
        roomNumber,
        CatalogBaths: catalogBathsId,
        catalogPrice: catalogPriceId,
        catalogBed: catalogBedId,
        latitude,
        longitude,
      });

      // Ürünü veritabanına kaydetme
      await newProduct.save();

      // Ürün bilgilerini ve referansları doldur
      const populatedProduct = await Product.findById(newProduct._id)
        .populate("CatalogBaths")
        .populate("catalogPrice")
        .populate("catalogBed");

      // Başarıyla oluşturulmuş ürünle birlikte yanıt gönder
      res.status(201).json(populatedProduct);
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("CatalogBaths")
      .populate("catalogPrice")
      .populate("catalogBed");

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // ID'nin geçerli bir ObjectId olup olmadığını kontrol et
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    // Ürünü bul ve populate et
    const product = await Product.findById(id)
      .populate("CatalogBaths")
      .populate("catalogPrice")
      .populate("catalogBed");

    // Ürün bulunamazsa hata dön
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Başarılı cevap
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Controller to update a product
exports.updateProduct = async (req, res) => {
  try {
    // Find the product by ID
    const product = await Product.findById(req.params.id);

    // Check if product exists
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Delete old main image if a new one is provided
    if (req.files && req.files.mainRoomImg) {
      await deleteFromCloudinary(product.mainRoomImg); // Function to delete from cloud storage
      const newMainRoomImgUrl = `http://localhost:5000/uploads/room/${req.files.mainRoomImg[0].filename}`;
      product.mainRoomImg = newMainRoomImgUrl;
    }

    // Delete old room images if new ones are provided
    if (req.files && req.files.roomImgs) {
      // Delete old images
      for (const oldImgUrl of product.roomImgs) {
        await deleteFromCloudinary(oldImgUrl); // Delete from cloud
      }

      const roomImgsUrls = req.files.roomImgs.map(file => `http://localhost:5000/uploads/rooms/${file.filename}`);
      product.roomImgs = roomImgsUrls;
    }

    // Update other fields from the request body
    const { title, description, location, roomNumber, CatalogBaths, catalogPrice, catalogBed, latitude, longitude } = req.body;
    product.title = title || product.title;
    product.description = description || product.description;
    product.location = location || product.location;
    product.roomNumber = roomNumber || product.roomNumber;
    product.CatalogBaths = CatalogBaths || product.CatalogBaths;
    product.catalogPrice = catalogPrice || product.catalogPrice;
    product.catalogBed = catalogBed || product.catalogBed;
    product.latitude = latitude || product.latitude;
    product.longitude = longitude || product.longitude;

    // Save the updated product
    await product.save();

    // Populate references and send the updated product
    const populatedProduct = await Product.findById(product._id)
      .populate("CatalogBaths")
      .populate("catalogPrice")
      .populate("catalogBed");

    res.json(populatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to delete a product
exports.deleteProduct = async (req, res) => {
  try {
    // Find the product by ID
    const product = await Product.findById(req.params.id);

    // Check if product exists
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Delete main image and room images if they exist
    await deleteFromCloudinary(product.mainRoomImg); // Function to delete from cloud storage
    for (const imgUrl of product.roomImgs) {
      await deleteFromCloudinary(imgUrl); // Delete from cloud storage
    }

    // Delete product from the database
    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product and images deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

