// src/routes/productRoutes.js
const express = require("express");
const { createProduct, getAllProducts,getProductById, updateProduct, deleteProduct } = require("../controllers/product.controller");
const router = express.Router();

router.post("/createProduct", createProduct);
router.get("/getAllProducts", getAllProducts);
router.get("/getProductsById/:id", getProductById);
router.put("/uptadeProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

module.exports = router;