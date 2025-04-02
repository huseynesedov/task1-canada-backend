// src/config/multer.js

const express = require("express");
const multer = require("multer");
const { createProduct, getProducts, updateProduct, deleteProduct } = require("../controllers/product.controller");

const router = express.Router();

// Multer middleware ayarları (Memory Storage kullanarak dosyaları Cloudinary'e yüklemek için)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.post(
  "/api/Product/createProduct",
  upload.fields([
    { name: "mainRoomImg", maxCount: 1 },
    { name: "roomImgs", maxCount: 5 },
  ]),
  createProduct
);

router.get("/api/Product/getAllProducts", getProducts);

router.put(
  "/api/Product/updateProduct/:id",
  upload.fields([
    { name: "mainRoomImg", maxCount: 1 },
    { name: "roomImgs", maxCount: 5 },
  ]),
  updateProduct
);

router.delete("/api/Product/deleteProduct/:id", deleteProduct);

module.exports = router;
