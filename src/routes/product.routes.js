// src/routes/productRoutes.js
const express = require("express");
const { createProduct, getProducts, updateProduct, deleteProduct } = require("../controllers/product.controller");
const router = express.Router();

router.post("/createProduct", createProduct);
router.get("/getAllProducts", getProducts);
router.put("/uptadeProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

module.exports = router;